from django.contrib.auth.models import AbstractUser
from django.db import models


class Users(AbstractUser):
    photo = models.ImageField(upload_to='images/photos', default='')
    friend_id = models.ManyToManyField("Users", related_name="friend", default = [], blank=True)
    def __str__(self):
        return str(self.first_name) + ' ' + str(self.last_name) + " " + str(self.username)
    class Meta:
        verbose_name_plural = "users"

class Images(models.Model):
    img = models.ImageField(upload_to='images/imgs', default='')
    name = models.CharField(max_length=400)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="owner", default = 0)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "images"


class Chats(models.Model):
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="sender", default=0, db_constraint=False)
    reciever = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="reciever", default=0, db_constraint=False)
    def __str__(self):
        return self.sender.username + " " +  self.reciever.username
    class Meta:
        verbose_name_plural = "chats"

class Messages(models.Model):
    chat = models.ForeignKey(Chats, on_delete=models.CASCADE, related_name="chat", default=0, db_constraint=False)
    message = models.CharField(max_length=400)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, default=0, related_name="user", db_constraint=False)
    def __str__(self):
        return self.message
    class Meta:
        verbose_name_plural = "messages"


