from rest_framework import serializers

from .models import Member


class MemberSerializers(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = "__all__"
