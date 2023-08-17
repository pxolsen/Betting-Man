from django.urls import path
from .views import Sign_up, Log_in, Log_out, Info, Delete

urlpatterns = [
    path("signup/", Sign_up.as_view(), name="signup"),
    path("login/", Log_in.as_view(), name="login"),
    path("info/", Info.as_view(), name="info"),
    path("logout/", Log_out.as_view(), name="logout"),
    path("delete/", Delete.as_view(), name="delete"),
]