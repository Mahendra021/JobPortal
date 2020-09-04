from .models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer


class ChoicesField(serializers.Field):
    def __init__(self, choices, **kwargs):
        self._choices = choices
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return getattr(self._choices, data)


class CustomRegisterSerializer(RegisterSerializer):

    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['user_type'] = self.validated_data.get('user_type', '')
        return data_dict


# class CustomLoginSerializer(LoginSerializer):

#     user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES,)

    # def validate_user_type(self, data):

    #     user_type = self.cleaned_data.get('user_type')

    #     if data['usre_type'] != user_type:
    #         raise ValidationError("User Type is not of this User")
    #     return user_type


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'user_type', 'username', 'last_login')
        read_only_fields = ('email',)
