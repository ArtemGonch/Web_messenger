# Generated by Django 4.2.7 on 2023-12-12 18:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0007_alter_users_friend_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messages',
            name='chat',
            field=models.ForeignKey(db_constraint=False, default=0, on_delete=django.db.models.deletion.CASCADE, related_name='chat', to='messenger.chats'),
        ),
        migrations.AlterField(
            model_name='messages',
            name='user',
            field=models.ForeignKey(db_constraint=False, default=0, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]
