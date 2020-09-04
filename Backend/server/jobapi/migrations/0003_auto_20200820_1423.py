# Generated by Django 2.2.9 on 2020-08-20 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobapi', '0002_auto_20200723_1824'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='about',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='date_start',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='no_of_emp',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='skype_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='website',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='working_day',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='working_hour',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
