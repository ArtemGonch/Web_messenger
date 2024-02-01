from .models import *
from .serializers import *
from rest_framework import viewsets, views, response

class UsersViewSet(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
    def perform_create(self, serializer):
        user = Users.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])
        return user
    def get_serializer_class(self):
        if self.action == 'partial_update':
            return GetNewFriendSerializer
        return super().get_serializer_class()


    
class UserCurrent(views.APIView):
  def get(self, request):
    serializer = AuthUsersSerializer(request.user)
    return response.Response(serializer.data)


class ImagesViewSet(viewsets.ModelViewSet):
	serializer_class = ImagesSerializer
	queryset = Images.objects.all()

class ChatsViewSet(viewsets.ModelViewSet):
    serializer_class = ChatsSerializer
    queryset = Chats.objects.all()
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(sender=self.request.user)

        return super().perform_create(serializer)
    def get_serializer_class(self):
        if self.action == 'list':
            return ChatsListSerializer
        return super().get_serializer_class()
        


class MessagesViewSet(viewsets.ModelViewSet):
    serializer_class = MessagesSerializer
    queryset = Messages.objects.all()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        return super().perform_create(serializer)