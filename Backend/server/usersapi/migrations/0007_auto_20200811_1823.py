# Generated by Django 2.2.9 on 2020-08-11 12:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('usersapi', '0006_jobseeker_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='jobseeker_id',
        ),
        migrations.RemoveField(
            model_name='education',
            name='jobseeker_id',
        ),
        migrations.RemoveField(
            model_name='higher_education',
            name='jobseeker_id',
        ),
        migrations.RemoveField(
            model_name='resume',
            name='jobseeker_id',
        ),
        migrations.RemoveField(
            model_name='skill',
            name='jobseeker_id',
        ),
        migrations.AddField(
            model_name='address',
            name='owner',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='address', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='education',
            name='owner',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='education', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='higher_education',
            name='owner',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='high_education', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='resume',
            name='owner',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='resume', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='skill',
            name='owner',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='skill', to=settings.AUTH_USER_MODEL),
        ),
    ]