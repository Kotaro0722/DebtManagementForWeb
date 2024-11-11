from rest_framework import viewsets
from .models import Member
from .serializers import MemberSerializers
# Create your views here.


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializers
