from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.


class company(models.Model):

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='company', on_delete=models.CASCADE, default=1)
    name = models.CharField(max_length=50)
    about = models.TextField(blank=True, null=True)
    telephone = models.CharField(max_length=12)
    emial = models.EmailField(max_length=254)
    skype_name = models.CharField(max_length=50, blank=True, null=True)
    website = models.URLField(max_length=200, blank=True, null=True)
    date_start = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True)
    working_hour = models.CharField(max_length=30, blank=True, null=True)
    working_day = models.CharField(max_length=30, blank=True, null=True)
    no_of_emp = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name


class company_address(models.Model):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="company_address", on_delete=models.CASCADE, default=1)
    company_id = models.ForeignKey(
        "company", related_name="address", on_delete=models.CASCADE)
    local_addr = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    pincode = models.IntegerField()
    xcoord = models.FloatField(null=True)
    ycoord = models.FloatField(null=True)
    # distance = models.FloatField(null=True, blank=True, default=None)

    def __str__(self):
        return self.local_addr


class jobdetail(models.Model):

    JOB_TYPE_CHOICES = (
        ('Part Time', 'Part Time'),
        ('Full Time', 'Full Time'),
        ('Intership', 'Intership'),
    )

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="job", on_delete=models.CASCADE, default=1)
    company_id = models.ForeignKey(
        "company", related_name="job", on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    publish_on = models.DateField(auto_now=False, auto_now_add=False)
    expired_on = models.DateField(auto_now=False, auto_now_add=False)
    experience = models.IntegerField()
    salary = models.IntegerField()
    job_type = models.CharField(
        max_length=30, choices=JOB_TYPE_CHOICES, default='Full Time')
    description = models.TextField()

    def __str__(self):
        return self.title


class company_depart(models.Model):

    department = models.CharField(max_length=50)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="company_depart", on_delete=models.CASCADE, default=1)
    company_id = models.ForeignKey(
        "company", related_name="company_depart", on_delete=models.CASCADE)

    def __str__(self):
        return self.department


class image(models.Model):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="image", on_delete=models.CASCADE, default=1)
    company_id = models.ForeignKey(
        "company", related_name="image", on_delete=models.CASCADE)
    source = models.CharField(max_length=50)

    def __str__(self):
        return self.source


class jobskill(models.Model):

    skill = models.CharField(max_length=50)
    job_id = models.ForeignKey(
        "jobdetail", related_name="jobskill", on_delete=models.CASCADE)

    def __str__(self):
        return self.skill
