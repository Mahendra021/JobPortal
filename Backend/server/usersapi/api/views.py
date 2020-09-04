from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import filters
from rest_framework.response import Response

from usersapi.models import *
from usersapi.api.serializers import *


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = Jobseeker.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'owner': ['exact']}
    # permission_classes = [permissions.IsAuthenticated]


class SourceViewSet(viewsets.ModelViewSet):

    parser_classes = (MultiPartParser, FormParser)

    serializer_class = SourceSerializer
    queryset = Source.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'owner': ['exact']}

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdderssViewSet(viewsets.ModelViewSet):

    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'owner': ['exact']}


class High_EducationViewSet(viewsets.ModelViewSet):

    serializer_class = High_EducationSerializer
    queryset = Higher_Education.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'owner': ['exact']}


class EducationViewSet(viewsets.ModelViewSet):

    serializer_class = EducationSerializer
    queryset = Education.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'owner': ['exact']}


class SkillViewSet(viewsets.ModelViewSet):

    serializer_class = SkillSerializer
    queryset = Skill.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'owner': ['exact']}


class UserallViesSet(viewsets.ModelViewSet):

    serializer_class = UserAllSerializer
    queryset = Jobseeker.objects.all()


class SuggestionViewSet(viewsets.ModelViewSet):

    serializer_class = SuggestionSerializer
    queryset = Jobseeker.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['fname', 'lname']


class FilterViewSet(viewsets.ModelViewSet):
    
    serializer_class = UserAllSerializer
    queryset = Jobseeker.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
    #     'job__salary': ['gte'],
        'experians': ['lte']
    }
    search_fields = ['fname', 'lname']