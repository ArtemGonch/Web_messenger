# Generated by Django 4.2.7 on 2023-12-12 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0004_users_user_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='user_name',
        ),
        migrations.AddField(
            model_name='images',
            name='user_name',
            field=models.CharField(default='', max_length=400),
            preserve_default=False,
        ),
    ]
