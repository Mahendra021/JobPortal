# Generated by Django 2.2.9 on 2020-08-21 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersapi', '0009_auto_20200811_1839'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='source',
            field=models.FileField(blank=True, null=True, upload_to='Resume'),
        ),
    ]
