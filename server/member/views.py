from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from .models import Member


class MemberCheckView(APIView):
    def get(self, request):
        discord_id = request.query_params.get("discord_id")
        user = Member.objects.filter(discord_id=discord_id).first()

        if user:
            return Response({
                "user_id": user.id,
                "user_name": user.name,
                "discord_id": user.discord_id,
                "avatar_id": user.avatar_id
            })
        else:
            # ユーザーが見つからない場合、新規ユーザー登録を行う
            return MemberRegisterView.as_view()(request._request)


class MemberRegisterView(APIView):
    def post(self, request):
        discord_id = request.data.get("discord_id")
        username = request.data.get("username")

        if not discord_id or not username:
            return Response(
                {"error": "discord_id and username are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 新規ユーザーを作成
        user = Member.objects.create(discord_id=discord_id, username=username)

        # トークン発行してログイン状態を保持（JWTの場合）
        refresh = RefreshToken.for_user(user)

        return Response({
            "user_id": user.id,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
