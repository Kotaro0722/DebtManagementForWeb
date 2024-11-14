from django.urls import include, path
from rest_framework import routers

from .views import MemberCheckView


router = routers.DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("check/", MemberCheckView.as_view(), name="check")
]
