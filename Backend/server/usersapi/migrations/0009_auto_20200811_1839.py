# Generated by Django 2.2.9 on 2020-08-11 13:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('usersapi', '0008_auto_20200811_1824'),
    ]

    operations = [
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.FileField(upload_to='Resume')),
                ('profile', models.ImageField(blank=True, null=True, upload_to='Image')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Resume',
        ),
    ]
