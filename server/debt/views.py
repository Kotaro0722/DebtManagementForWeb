import environ
import requests

from rest_framework import viewsets,status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Member
from .serializers import MemberSerializers

env=environ.Env()
env.read_env(".env")

# Create your views here.
class MemberViewSet(viewsets.ModelViewSet):
    queryset=Member.objects.all()
    serializer_class=MemberSerializers
    
class DiscordLoginView(APIView):
    def post(self,request):
        code = request.data.get("code")
        if not code:
            return Response({"error":"Code is required."},status=status.HTTP_400_BAD_REQUEST)
        
        response=requests.post(
            "https://discordapp.com/api/oauth2/token",
            headers={"Content-Type":"application/x-www-form-urlencoded"},
            data={
                "client_id": env("DISCORD_CLIENT_ID"),
                "client_secret": env("DISCORD_CLIENT_SECRET"),
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": "http://localhost:3000/dashboard",
            },
        )
        if response.status_code!=200:
            return Response({"error":f"Failed to authenticate by {response.json()}"},status=status.HTTP_401_UNAUTHORIZED)
        
        login_data=response.json()
        access_token=login_data.get("access_token")
        
        response=requests.get(
            "https://discordapp.com/api/users/@me",
            headers={"Authorization":f"Bearer {access_token}"}
        )
        if response.status_code!=200:
            return Response({"error":f"Failed to get your data by {response.json()}"},status=status.HTTP_401_UNAUTHORIZED)

        user_data=response.json()
        user_info={
            "user_name":user_data["username"],
            "discord_id":user_data["id"],
            "avatar_id":user_data["avatar"]
        }        
        response=Response(user_info,status=status.HTTP_200_OK)
        response.set_cookie("access_token",access_token,httponly=True)
        return response
            