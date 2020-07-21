from django.db import models

# Create your models here.


class company(models.Model):

    name = models.CharField(max_length=50)
    about = models.TextField()
    telephone = models.CharField(max_length=12)
    emial = models.EmailField(max_length=254)
    skype_name = models.CharField(max_length=50)
    website = models.URLField(max_length=200)
    date_start = models.DateField(auto_now=False, auto_now_add=False)
    working_hour = models.CharField(max_length=30)
    working_day = models.CharField(max_length=30)
    no_of_emp = models.IntegerField()
    xcoord = models.FloatField()
    ycoord = models.FloatField()

    def __str__(self):
        return self.name


class company_address(models.Model):

    company_id = models.ForeignKey(
        "company", related_name="address", on_delete=models.CASCADE)
    local_addr = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    pincode = models.IntegerField()
    # distance = models.FloatField(null=True, blank=True, default=None)

    def __str__(self):
        return self.local_addr


class jobdetail(models.Model):

    JOB_TYPE_CHOICES = (
        ('Part Time', 'Part Time'),
        ('Full Time', 'Full Time'),
        ('Intership', 'Intership'),
    )

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
    company_id = models.ForeignKey(
        "company", related_name="company_depart", on_delete=models.CASCADE)

    def __str__(self):
        return self.department


class image(models.Model):

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
