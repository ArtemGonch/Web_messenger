from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *



class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + ((None, {'fields': ('photo', 'friend_id',)}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {'fields': ('photo', 'firend_id',)}),)


admin.site.register(Users, CustomUserAdmin)
admin.site.register(Images)
admin.site.register(Messages)
admin.site.register(Chats)
