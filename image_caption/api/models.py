from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# payment getway
class CheckoutSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_status = models.CharField(max_length=255)
    sessionid  =  models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CheckoutSession {self.sessionid}"


   