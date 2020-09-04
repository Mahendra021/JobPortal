from rest_framework import serializers
from usersapi.models import *


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


class High_EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Higher_Education
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobseeker
        fields = "__all__"


class UserAllSerializer(serializers.ModelSerializer):

    source = SourceSerializer(many=True)
    skill = SkillSerializer(many=True)
    education = EducationSerializer(many=True)
    high_education = High_EducationSerializer(many=True)
    address = AddressSerializer(many=True)

    class Meta:
        model = Jobseeker
        fields = "__all__"


class SuggestionSerializer(serializers.ModelSerializer):

    skill = SkillSerializer(many=True)

    class Meta:
        model = Jobseeker
        fields = ['id', 'fname', 'lname', 'skill']
