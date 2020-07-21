from django.urls import path

from jobapi.api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'map', MapViewSet, basename='map')
router.register(r'copmany', CopmanyViewSet, basename='copmany')
router.register(r'suggetion', SuggestionViewSet, basename='suggetion')
router.register(r'filter', FilterViewSet, basename="filter")
router.register(r'recommended', RecommendedViewSet, basename="recommended")
router.register(r'post', JobViewSet, basename='post')
router.register(r'address', AddressViewSet, basename="companyaddress")
router.register(r'image', ImageViewSet, basename="image")

urlpatterns = router.urls
