from django.urls import include, path
from rest_framework import routers

from .views import DiscordLoginView, MemberViewSet

router = routers.DefaultRouter()
router.register(r"member", MemberViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("user_data/", DiscordLoginView.as_view(), name="user_data"),
]
