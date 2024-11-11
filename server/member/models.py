from django.db import models


# Create your models here.
class Member(models.Model):
    name = models.CharField(max_length=50)
    member_id = models.CharField(max_length=100)
    avatar_id = models.CharField(max_length=100)

    def __str__(self):
        return self.name
