# Generated by Django 2.2.9 on 2020-06-22 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobseeker',
            name='experians',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
