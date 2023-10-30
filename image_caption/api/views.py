from sched import scheduler
from django.shortcuts import render,get_object_or_404,redirect
from api.serializers import StripePaymentSerializer
import stripe
import jwt
from datetime import datetime, timedelta
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate,login as django_login, logout as django_logout
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.models import CheckoutSession,File,StatusEnum
from rest_framework.views import APIView
from api.serializers import UserSerializer,FileSerializer,FileUpdateSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from apscheduler.triggers.cron import CronTrigger
from django.db.models import Q
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from datetime import date, datetime
from image_caption.settings import SECRET_Token
import requests, base64
import os
import shutil
from bardapi import Bard
from urllib.parse import urlparse
import requests
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.schedulers.background import BackgroundScheduler
import time
from api.exceptions import NotFoundException
from rest_framework.parsers import MultiPartParser, FormParser
import openai
from rest_framework.pagination import PageNumberPagination
from api.pagination import file_paginate



monthlyplanId ='prod_Ol1FM2UwmNoT2g'
yearlyPlanId = 'prod_Ol1H8gKuuDAA07'
# Create your views here.
ACCESS_TOKEN_EXPIRES_IN = 15
SECRET_KEY = 'njnknfjsnfsjknfgsngijnjgrdnk'
stripe.api_key = 'sk_test_51N9PoyH2aTqcNEkNL9hLemkMQ8KvSlzEHfqgsdVSyGdjZBepzJ8SMdAW3Ost9aNZQCoGJ87MON83HYv941G8bfko00XdIpzSKm'
# from transformers import pipeline

# pipe = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")
openai.api_key = "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"


#base url append
def baseurl(request):
    """
    Return a BASE_URL template context for the current request.
    """
    if request.is_secure():
        scheme = "https://"
    else:
        scheme = "http://"

    return scheme + request.get_host()


def get_user(email):
    try:
        user=User.objects.filter(
                    Q(email=email.lower())
                    | Q(username=email)
                ).first()
        if user:
            return [True,user]
        else:
            return [False,None]
    except:
        return [False,None]
    
class UserRegistrationView(APIView):
     permission_classes = (AllowAny,)
     def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     

class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data.get("username", None)
            password = request.data.get("password", None)

            if email and password:
                user = get_user(email)

                if user[0]:
                    if not not user[1].password:
                        user_data = authenticate(username=user[1], password=password)

                        if user_data:
                            django_login(request, user[1])
                            token, created = Token.objects.get_or_create(user=user[1])
                            return Response({
                                "status": status.HTTP_200_OK,
                                "message": "Successfully logged in",
                                "user_id": user_data.id,
                                "token": token.key,
                                "base_url": baseurl(request),
                            })
                        else:
                            content = {
                                "status": status.HTTP_204_NO_CONTENT,
                                "message": "Unable to Login with given credentials"
                            }
                            return Response(content)
                    else:
                        content = {
                            "status": status.HTTP_204_NO_CONTENT,
                            "message": "Please reset your password"
                        }
                        return Response(content)
                else:
                    content = {
                        "status": status.HTTP_204_NO_CONTENT,
                        "message": "Unable to Login with given credentials"
                    }
                    return Response(content)
            return Response({
                "data": [],
                "status": status.HTTP_401_UNAUTHORIZED,
                "message": "Unable to login with given credentials"
            })
        except Exception as e:
            context = {
                "status": status.HTTP_400_BAD_REQUEST,
                "message": str(e)
            }
            return Response(context)
    

# create token
def createToken(cardnumber, expmonth, expyear, cvv):
    data = stripe.Token.create(
        card={

            "number": str(cardnumber),
            "exp_month": int(expmonth),
            "exp_year": int(expyear),
            "cvc": str(cvv),

        })
    return data['id']

# create stripe customer
def createCustomer(token, username, email):
    customer = stripe.Customer.create(stripe.api_key, source=token,
                                      name=username, email=email)
    return customer.id


def generate_card_token(cardnumber, expmonth, expyear, cvv):
    data = stripe.Token.create(
        card={
            "number": str(cardnumber),
            "exp_month": int(expmonth),
            "exp_year": int(expyear),
            "cvc": str(cvv),
        })
    card_token = data['id']

    return card_token


class StripeCheckoutSession(APIView):
    def post(self, request):
        try:
            user_id = request.user.id
            bak = base64.b64encode(str(user_id).encode()).decode()  # Encode user_id in base64
            # plan_id = request.data.get('plan_id')
            plan_id = "price_1NxVCaH2aTqcNEkNLq88st0B"#monthly
            # plan_id = "price_1NxVETH2aTqcNEkNRrhFCz0W"#yearly
            session = stripe.checkout.Session.create(
                success_url = f"{LocalhostDomain}/success?bak={bak}",
                cancel_url = f"{LocalhostDomain}/cancel?bak={bak}",
                payment_method_types=["card"],
                line_items=[
                    {
                        "price": plan_id,
                        "quantity": 1,
                    },
                ],
                mode="subscription",
            )
            # Save the data to the CheckoutSession model
            checkout_session = CheckoutSession(
                user_id=user_id,
                payment_status=session.payment_status,
                sessionid=session.id,
            )
            checkout_session.save()
            return Response({"session_id": session.id,"session_url":session.url})
        except stripe.error.StripeError as e:
            print(f"Error: {e}")
            return Response({"error": str(e)}, status=500)
        

# class StripeCheckoutSession(APIView):
#     def post(self, request):
#         try:
#             user_id = request.user.id
#             plan_choice = request.data.get('plan_choice')

#             if plan_choice == 'monthly':
#                 plan_id = "price_1NxVCaH2aTqcNEkNLq88st0B"  # Monthly plan
#             elif plan_choice == 'yearly':
#                 plan_id = "price_1NxVETH2aTqcNEkNRrhFCz0W"  # Yearly plan
#             else:
#                 return Response({"error": "Invalid plan choice"}, status=400)

#             session = stripe.checkout.Session.create(
#                 success_url=f"{LocalhostDomain}/success.html?userId={user_id}",
#                 cancel_url=f"{LocalhostDomain}/cancel.html?userId={user_id}",
#                 payment_method_types=["card"],
#                 line_items=[
#                     {
#                         "price": plan_id,
#                         "quantity": 1,
#                     },
#                 ],
#                 mode="subscription",
#             )

#             # Save the data to the CheckoutSession model
#             checkout_session = CheckoutSession(
#                 user_id=user_id,
#                 payment_status=session.payment_status,
#                 sessionid=session.id,
#                 plan_choice=plan_choice,
#             )
#             checkout_session.save()

#             return Response({"session_id": session.id, "session_url": session.url})
#         except stripe.error.StripeError as e:
#             print(f"Error: {e}")
#             return Response({"error": str(e)}, status=500)


# payment success
class SuccessPaymentUpdate(APIView):
    def post(self,request):
        # user_id = request.query_params.get('user_id')
        user_id = request.user.id
        print(user_id,">>>>>")
        checkout_session = CheckoutSession.objects.filter(user_id=user_id).first()
        if checkout_session:
            checkout_session.payment_status = "success"
            checkout_session.save()
            return Response({"message": f"Payment status updated for user {user_id}"})
        else:
            return Response({"error": "User not found or no CheckoutSession record found"}, status=404)


#cancle subscription
class CanclePaymentUpdate(APIView):
    def post(self,request):
        user_id = request.user.id
        # user_id = request.query_params.get('user_id')
        checkout_session = CheckoutSession.objects.filter(user_id=user_id).first()
        if checkout_session:
            checkout_session.payment_status = "cancel"
            checkout_session.save()
            return Response({"message": f"Payment status cancel for user {user_id}"})
        else:
            return Response({"error": "User not found or no CheckoutSession record found"}, status=404)
        

class LogoutView(APIView):
    authentication_classes = (TokenAuthentication,)
    # permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        logged_in_token = request.query_params.get("user_token")
        print(logged_in_token)
        if logged_in_token:
            logged_in_user_id = User.objects.filter(auth_token=logged_in_token).first()
            if logged_in_user_id:
                logged_in_user_id.delete()
            django_logout(request)
            content = {"status": 200, "message": "LogOut Successfully"}
        else:
            content = {"status": 400, "message": "Invalid token"}

        return Response(content, status=status.HTTP_200_OK)


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.data['file']

        # TODO: Dynamic File Generate
        upload_dir = "uploads/"
        # Create the upload directory if it doesn't exist
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        # Get the destination path
        dest = os.path.join(upload_dir, file.name)

        # Copy the file contents
        with open(dest, "wb") as buffer:
            shutil.copyfileobj(file, buffer)

        base_url = "http://localhost:8000/"
        file_url = f"{base_url}uploads/{file.name}"

        # Save the file in the database
        file_data = {
            'file_name': file.name,
            'file_url': file_url,
            'caption': '',
            'detailed_caption': '',
            'status': 'pending'
        }
        serializer = FileSerializer(data=file_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class FileListView(APIView):
    page_size = 10  # Set the number of items per page

    def get(self, request):
        page = request.query_params.get('page', 1)
        files = File.objects.all()

        # Use your custom pagination utility
        paginated_files = file_paginate(files, page, per_page=self.page_size)

        if not paginated_files:
            return Response([], status=status.HTTP_204_NO_CONTENT)

        serializer = FileSerializer(paginated_files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class FileDetailView(APIView):
    def get(self, request, file_id):
        try:
            file = File.objects.get(id=file_id)
            serializer = FileSerializer(file)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except File.DoesNotExist:
            raise NotFoundException("File not found")
        


def elaborate_text(text):
    prompt = "Explain text in two or three sentences with detail and make sure the meaning of the sentence remain same: "+text
    data = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.3,
        max_tokens=300
    )
    return data


class FileProcessingView(APIView):
    def process_file(self,file):
        try:
            
            # Change the file status to 'progress' before processing
            file.status = StatusEnum.progress
            file.save()

            prompt = "Explain this image"
            bard = Bard(token=SECRET_Token)
            image_url = file.file_url
            parsed_url = urlparse(image_url)
            file_name = parsed_url.path.split("/")[-1]
            image_path = r"./uploads/" + file_name
            image = open(image_path, 'rb').read()
            bard_answer = bard.ask_about_image(prompt, image)
            
            if bard_answer:
                generated_text = bard_answer['content']
            else:
                model_output = pipe(file.file_url)
                generated_text = str(model_output[0]["generated_text"])
                sentences = elaborate_text(generated_text)
                generated_text = sentences["choices"][0]["text"]
            
            # Update file information and change status to 'completed'
            file.detailed_caption = generated_text
            file.caption = generated_text
            file.status = 'completed'
            file.save()
            
        except Exception as e:
            print(f"Error processing file ID {file.id}: {e}")
            file.status = 'pending'
            file.save()
        
    def abc(self):
        pending_files = File.objects.filter(status='pending')
        if pending_files:
            for file in pending_files:
                self.process_file(file)
            response_data = {
                        "id": file.id,
                        "file_name": file.file_name,
                        "file_url": file.file_url,
                        "caption": file.caption,
                        "detailed_caption": file.detailed_caption,
                        "created_at": file.created_at,
                        "updated_at": file.updated_at,
                        "status": 'completed'
                    }
            return Response(response_data, status=status.HTTP_200_OK)  
        else:
            return Response(status=status.HTTP_200_OK,)
