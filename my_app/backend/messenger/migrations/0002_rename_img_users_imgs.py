# Generated by Django 4.2.7 on 2023-11-14 13:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='img',
            new_name='imgs',
        ),
    ]
