from django.urls import include, path
from rest_framework import routers

from .views import DiscordLoginView

router = routers.DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("user_data/", DiscordLoginView.as_view(), name="user_data"),
]
