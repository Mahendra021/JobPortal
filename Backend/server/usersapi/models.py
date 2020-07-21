from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Jobseeker(models.Model):

    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other')
    )
    JOB_TYPE_CHOICES = (
        ('Permanent', 'Permanent'),
        ('Temporry/Contract', 'Temporry/Contract'),
        ('Both', 'Both')
    )
    EMPLOYMENT_TYPE_CHOICES = (
        ('Full Time', 'Full Time'),
        ('Part Time', 'Part Time'),
        ('Both', 'Both'),
    )

    # owner = models.OneToOneField(User related_name='jobseeker' on_delete=models.CASCADE)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    mobile = models.CharField(max_length=13)
    gender = models.CharField(
        max_length=50, choices=GENDER_CHOICES, default='Male')
    date_of_brith = models.DateField(
        auto_now=False, auto_now_add=False, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    job_type = models.CharField(
        max_length=50, choices=JOB_TYPE_CHOICES, default='Both')
    employment_type = models.CharField(
        max_length=50, choices=EMPLOYMENT_TYPE_CHOICES, default='Both')
    experians = models.IntegerField()

    def __str__(self):
        return self.fname


class Address(models.Model):

    jobseeker_id = models.ForeignKey(
        Jobseeker, related_name="address", on_delete=models.CASCADE)
    local_addr = models.TextField()
    local_area_name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    pincode = models.IntegerField()

    def __str__(self):
        return self.local_area_name


class Higher_Education(models.Model):

    STUDY_CHOICES = (
        ('Doctorate/Ph.D', 'Doctorate/Ph.D'),
        ('Masters/Post-Graduation', 'Masters/Post-Graduation'),
        ('Graduation/Diploma', 'Graduation/Diploma')
    )

    COURSE_TYPE_CHOICES = (
        ('Full Time', 'Full Time'),
        ('Part Time', 'Part Time'),
        ('Correspondence', 'Correspondence')
    )

    jobseeker_id = models.ForeignKey(
        Jobseeker, related_name="high_education", on_delete=models.CASCADE)
    qualification = models.CharField(max_length=50, choices=STUDY_CHOICES)
    course = models.CharField(max_length=50)
    specialization = models.CharField(max_length=50)
    university_college = models.CharField(max_length=150)
    course_type = models.CharField(
        max_length=50, choices=COURSE_TYPE_CHOICES, default='Full Time')
    passing_year = models.CharField(max_length=4)

    def __str__(self):
        return self.course


class Education(models.Model):

    STUDY_CHOICES = (
        ('12th', '12th'),
        ('10th', '10th'),
        ('Below 10th', 'Below 10th')
    )

    jobseeker_id = models.ForeignKey(
        Jobseeker, related_name="education", on_delete=models.CASCADE)
    qualification = models.CharField(max_length=50, choices=STUDY_CHOICES)
    Board = models.CharField(max_length=50)
    yerar_of_passing = models.CharField(max_length=4)
    medium = models.CharField(max_length=50)
    percentage = models.CharField(max_length=50)

    def __str__(self):
        return self.qualification


class Skill(models.Model):

    jobseeker_id = models.ForeignKey(
        Jobseeker, related_name='skill', on_delete=models.CASCADE)
    skill = models.CharField(max_length=50)

    def __str__(self):
        return self.skill


class Resume(models.Model):

    jobseeker_id = models.ForeignKey(
        Jobseeker, related_name='resume', on_delete=models.CASCADE)
    source = models.FileField(upload_to='Resume')
    profile = models.ImageField(blank=True, null=True, upload_to='Image')
