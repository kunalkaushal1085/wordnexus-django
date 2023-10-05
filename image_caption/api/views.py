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
from api.models import CheckoutSession
from rest_framework.views import APIView
from api.serializers import UserSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from datetime import date, datetime


monthlyplanId ='prod_Ol1FM2UwmNoT2g'
yearlyPlanId = 'prod_Ol1H8gKuuDAA07'
# Create your views here.
ACCESS_TOKEN_EXPIRES_IN = 15
SECRET_KEY = 'njnknfjsnfsjknfgsngijnjgrdnk'
stripe.api_key = 'sk_test_51N9PoyH2aTqcNEkNL9hLemkMQ8KvSlzEHfqgsdVSyGdjZBepzJ8SMdAW3Ost9aNZQCoGJ87MON83HYv941G8bfko00XdIpzSKm'


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
        email = request.data.get('email')
        print(email,">>>>")
        password = request.data.get('password')
        print(password,">>>>")
        device_id = request.data.get("device_id")

        if email and password:
            print("inside if")
            user = authenticate(username=email, password=password)
            print('-----',user)

            if user:
                if not user.password:
                    return Response({
                        "status": status.HTTP_400_BAD_REQUEST,
                        "message": "Please reset your password"
                    })

                django_login(request, user)
                token, created = Token.objects.get_or_create(user=user)

                return Response({
                    "status": status.HTTP_200_OK,
                    "message": "Successfully logged in",
                    "token": token.key,
                    "user_details": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        # Add any other user details you need here
                    },
                })

        return Response({
            "status": status.HTTP_401_UNAUTHORIZED,
            "message": "Unable to login with given credentials"
        })
    

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


Your_Domain = "http://127.0.0.1:8000/"
class StripeCheckoutSession(APIView):
    def post(self, request):
        try:
            user_id = request.user.id
            plan_id = request.data.get('plan_id')
            session = stripe.checkout.Session.create(
                success_url = f"{Your_Domain}/success.html?userId={user_id}",
                cancel_url = f"{Your_Domain}/cancel.html?userId={user_id}",
                payment_method_types=["card"],
                line_items=[
                    {
                        "price": plan_id,
                        "quantity": 1,
                    },
                ],
                mode="subscription",
            )
            print("Checkout Session created:")
            print(session)
            print('@@@@@@@@@@@@@@@@@',session.payment_status)
            # Save the data to the CheckoutSession model
            checkout_session = CheckoutSession(
                user_id=user_id,
                payment_status=session.payment_status,  # Set an initial payment status
                sessionid=session.id,
            )
            checkout_session.save()
            return Response({"session_id": session.id,"session_url":session.url})
        except stripe.error.StripeError as e:
            print(f"Error: {e}")
            return Response({"error": str(e)}, status=500)

# payment success
class SuccessPaymentUpdate(APIView):
    def post(self,request):
        user_id = request.query_params.get('user_id')
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
        user_id = request.query_params.get('user_id')
        print(user_id,">>>>>")
        checkout_session = CheckoutSession.objects.filter(user_id=user_id).first()
        if checkout_session:
            checkout_session.payment_status = "cancle"
            checkout_session.save()
            return Response({"message": f"Payment status cancle for user {user_id}"})
        else:
            return Response({"error": "User not found or no CheckoutSession record found"}, status=404)