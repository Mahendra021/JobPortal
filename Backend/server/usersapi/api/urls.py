from django.urls import path

from usersapi.api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'address', AdderssViewSet, basename='address')
router.register(r'higher_education', High_EducationViewSet,
                basename='higher_education')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'skill', SkillViewSet, basename='skill')
router.register(r'resume', ResumeViewSet, basename='resume')

urlpatterns = router.urls
