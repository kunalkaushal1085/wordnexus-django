from django.db import models
from django.contrib.auth.models import User
from enum import Enum

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


class StatusEnum(Enum):
    pending = "pending"
    progress = "progress"
    failed = "failed"
    completed = "completed"

class File(models.Model):
    file_name = models.CharField(max_length=255, db_index=True)
    file_url = models.CharField(max_length=255, blank=True, null=True)
    caption = models.TextField(blank=True, null=True)
    detailed_caption = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20,
        choices=[(status.value, status.value) for status in StatusEnum],
        default=StatusEnum.pending.value
    )