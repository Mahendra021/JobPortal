from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, is_staff=False, is_admin=False, is_active=True):

        if not email:
            raise ValueError("Users must have Email address")
        if not password:
            raise ValueError("Usres must have Password")

        user = self.model(
            email=self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.staff = is_staff
        user.admin = is_admin
        user.active = is_active
        user.save(using=self._db)

        return user

    def create_staffuser(self, email, username=None, password=None):
        user = self.create_user(
            email,
            username=username,
            password=password,
            is_staff=True
        )

        return user

    def create_superuser(self, email, username=None, password=None):
        user = self.create_user(
            email,
            username=username,
            password=password,
            is_staff=True,
            is_admin=True
        )

        return user


class User(AbstractBaseUser):

    email = models.EmailField(max_length=254, unique=True)
    username = models.CharField(max_length=50, blank=True, null=True)
    active = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    object = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        if self.is_admin:
            return True
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active
