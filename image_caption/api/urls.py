"""
URL configuration for image_caption project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('customer-register', views.UserRegistrationView.as_view()),
    path('customer-login', views.LoginView.as_view()),
    path('create-checkout-session', views.StripeCheckoutSession.as_view(), name='stripe_payment'),
    path('success',views.SuccessPaymentUpdate.as_view(), name='success-api'),
    path('cancle-subscription',views.CanclePaymentUpdate.as_view(), name='success-api'),
    path('customer-logout', views.LogoutView.as_view()),
    path('files/upload', views.FileUploadView.as_view()),
    path('files/', views.FileListView.as_view(), name='file-list'),
    path('files/<int:file_id>/', views.FileDetailView.as_view(), name='file-detail'),
    # path('process/', views.FileProcessingView.as_view(), name='file-processing')
    # path('files/update/', views.FileUpdateView.as_view(), name='file-update'),

]
