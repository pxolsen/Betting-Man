from django.urls import path
from .views import A_bet

urlpatterns = [
    path("", A_bet.as_view()),
]