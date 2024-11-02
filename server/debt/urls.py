from django.urls import path,include
from rest_framework import routers
from .views import MemberViewSet , DiscordLoginView

router=routers.DefaultRouter()
router.register(r"member",MemberViewSet)

urlpatterns = [
    path("",include(router.urls)),
    path("user_data/",DiscordLoginView.as_view(),name="user_data")
]
