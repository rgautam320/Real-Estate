from rest_framework import serializers
from .models import UserAccount


class AccountSerialier(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'
        lookup_field = 'email'