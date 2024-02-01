from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from messenger.views import *
from backend import settings
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



router = routers.DefaultRouter()
router.register(r'images', ImagesViewSet)
router.register(r'chats', ChatsViewSet)
router.register(r'messages', MessagesViewSet)
router.register(r'users', UsersViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/current/', UserCurrent.as_view(), name="users_current"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls))
]

if settings.DEBUG:
    urlpatterns = [
        path("__debug__/", include("debug_toolbar.urls")),
    ] + urlpatterns

urlpatterns += static(settings.STATIC_URL) + \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)