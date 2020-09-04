# Generated by Django 2.2.9 on 2020-09-03 11:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usersapi', '0010_auto_20200821_1815'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='jobseeker',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='address', to='usersapi.Jobseeker'),
        ),
        migrations.AddField(
            model_name='education',
            name='jobseeker',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='education', to='usersapi.Jobseeker'),
        ),
        migrations.AddField(
            model_name='higher_education',
            name='jobseeker',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='high_education', to='usersapi.Jobseeker'),
        ),
        migrations.AddField(
            model_name='skill',
            name='jobseeher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='skill', to='usersapi.Jobseeker'),
        ),
        migrations.AddField(
            model_name='source',
            name='jobseeker',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='source', to='usersapi.Jobseeker'),
        ),
    ]