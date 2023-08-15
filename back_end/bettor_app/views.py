from django.shortcuts import render
from rest_framework.views import APIView
from bettor_app.models import Bettor
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class Sign_up(APIView):
    def post(self, request) :
        username = request.data.get("username")
        password = request.data.get("password")
        new_bettor = Bettor.objects.create_user(username=username, password=password)
        token = Token.objects.create(user = new_bettor)
        return Response({"user": new_bettor.username, "token": token.key}, status=HTTP_201_CREATED)

class Log_in(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": username, "token": token.key})
        return Response(status=HTTP_404_NOT_FOUND)

class Log_out(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class Info(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({'username': request.user.username})