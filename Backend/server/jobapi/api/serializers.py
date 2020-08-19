from rest_framework import serializers
from jobapi.models import jobdetail, company, company_address, image, company_depart, jobskill


class ImageSerializer(serializers.ModelSerializer):
    class Meta():
        model = image
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta():
        model = company_depart
        fields = "__all__"


class JobSkillSerializer(serializers.ModelSerializer):
    class Meta():
        model = jobskill
        fields = ['id', 'skill']


class PostJobSerializer(serializers.ModelSerializer):
    class Meta():
        model = jobdetail
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):

    jobskill = JobSkillSerializer(many=True)

    class Meta():
        model = jobdetail
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta():
        model = company_address
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    class Meta():
        model = company
        fields = "__all__"


class MapSerializer(serializers.ModelSerializer):

    job = JobSerializer(many=True)
    address = AddressSerializer(many=True)
    image = ImageSerializer(many=True)
    company_depart = DepartmentSerializer(many=True)

    class Meta():
        model = company
        fields = "__all__"


class SuggestionJobSerializer(serializers.ModelSerializer):

    jobskill = JobSkillSerializer(many=True)

    class Meta():
        model = jobdetail
        fields = ['id', 'title', 'jobskill', 'experience', 'salary']


class SuggestionSerializer(serializers.ModelSerializer):

    job = SuggestionJobSerializer(many=True)

    class Meta():
        model = company
        fields = ['id', 'name', 'job']
