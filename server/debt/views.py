import environ
import requests

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.test import APIRequestFactory

# from member.views import MemberCheckView


env = environ.Env()
env.read_env(".env")


class DiscordLoginView(APIView):
    def get(self, request):
        code = request.query_params.get("code")
        if not code:
            return Response(
                {"error": "Code is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 'code'を用いてdiscordにアクセスしaccess_tokenを取得
        response = requests.post(
            "https://discordapp.com/api/oauth2/token",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data={
                "client_id": env("DISCORD_CLIENT_ID"),
                "client_secret": env("DISCORD_CLIENT_SECRET"),
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": "http://localhost:3000/dashboard",
            },
        )
        if response.status_code != 200:
            return Response(
                {"error": f"Failed to authenticate by {response.json()}"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        login_data = response.json()
        access_token = login_data.get("access_token")

        # 'access_token'を用いてログインしたユーザの情報を取得する
        response = requests.get(
            "https://discordapp.com/api/users/@me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        if response.status_code != 200:
            return Response(
                {"error": f"Failed to get your data by {response.json()}"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_data = response.json()
        user_info = {
            "user_name": user_data["username"],
            "discord_id": user_data["id"],
            "avatar_id": user_data["avatar"],
        }

        # try:
        #     factory = APIRequestFactory()
        #     request_data = factory.get(
        #         "/member/check",
        #         {"discord_id": user_info["discord_id"]}
        #     )
        #     member_check_view = MemberCheckView.as_view()
        #     response = member_check_view(request_data)
        #     response.raise_for_status()
        # except requests.exceptions.RequestException as e:
        #     return Response(
        #         {"error": str(e)},
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR
        #         )

        response = Response(user_info, status=status.HTTP_200_OK)
        return response
