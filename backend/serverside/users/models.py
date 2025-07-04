from django.db import models
from django.contrib.auth.models import User
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    age = models.PositiveIntegerField(null=True, blank=True)
    phone_number = models.CharField(max_length=10,null=True, blank=True)
    join_year = models.CharField(max_length=10,null=True, blank=True)
    pass_year = models.CharField(max_length=10,null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"