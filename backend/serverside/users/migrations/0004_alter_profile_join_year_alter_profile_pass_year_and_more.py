# Generated by Django 5.1.4 on 2025-07-01 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_profile_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='join_year',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='pass_year',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone_number',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
