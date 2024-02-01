from rest_framework import serializers
from .models import *
from drf_writable_nested import WritableNestedModelSerializer


class AuthUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'photo', 'friend_id', 'password']
        extra_kwargs =  {'password': {'write_only': True}}


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'photo', 'password']
        extra_kwargs =  {'password': {'write_only': True}}

class GetNewFriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'photo', 'friend_id', 'password']
        extra_kwargs =  {'password': {'write_only': True}}

class NewfirendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id']


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['id', 'img', 'user']

class MessagesSerializer(serializers.ModelSerializer):
    user = UsersSerializer(read_only=True)
    class Meta:
        model = Messages
        fields = '__all__'
        
class ChatsSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):   
    sender = UsersSerializer(read_only=True)
    reciever = NewfirendSerializer()
    class Meta:
        model = Chats
        fields = '__all__'


class ChatsListSerializer(serializers.ModelSerializer):
  last_message = serializers.SerializerMethodField()

  def get_last_message(self, obj):
      last_message = Messages.objects.filter(chat=obj.id).last()
      if not last_message:
        return ''
      return last_message.message
  
  class Meta:
    model = Chats
    fields = '__all__'
