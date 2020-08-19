from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.response import Response

from django.db import connection
import asyncio

from jobapi.models import jobdetail, company, company_address, image
from .serializers import *


class MapViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    # """
    serializer_class = MapSerializer
    queryset = company.objects.all()


class SuggestionViewSet(viewsets.ModelViewSet):

    serializer_class = SuggestionSerializer
    queryset = company.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'job__title', 'job__jobskill__skill']


class FilterViewSet(viewsets.ModelViewSet):
    serializer_class = MapSerializer
    queryset = company.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        'job__salary': ['gte'],
        'job__experience': ['lte']
    }
    search_fields = ['name', 'job__title', 'job__jobskill__skill']


class RecommendedViewSet(viewsets.ModelViewSet):
    serializer_class = MapSerializer
    queryset = company.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        'job__salary': ['gte'],
        'job__experience': ['lte'],
        'job__jobskill__skill': ['exact']
    }


class CopmanyViewSet(viewsets.ModelViewSet):

    serializer_class = CompanySerializer
    queryset = company.objects.all()


class JobViewSet(viewsets.ModelViewSet):

    serializer_class = PostJobSerializer
    queryset = jobdetail.objects.all()


class SkillViewSet(viewsets.ModelViewSet):

    serializer_class = JobSkillSerializer
    queryset = jobskill.objects.all()


class AddressViewSet(viewsets.ModelViewSet):

    serializer_class = AddressSerializer
    queryset = company_address.objects.all()


class ImageViewSet(viewsets.ModelViewSet):

    serializer_class = ImageSerializer
    queryset = image.objects.all()
