from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import validate_username
from django.core import validators as v

# Create your models here.
class Bettor(AbstractUser):
    username = models.CharField(unique=True, validators=[validate_username, v.MinLengthValidator(3), v.MaxLengthValidator(12)])
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []