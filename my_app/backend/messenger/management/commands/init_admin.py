__author__ = 'dkarchmer@gmail.com'

from django.conf import settings
from django.core.management.base import BaseCommand
from messenger.models import Users


class Command(BaseCommand):

    def handle(self, *args, **options):
        print(Users.objects.count())
        if Users.objects.count() == 0:
            for user in settings.ADMINS:
                username = user[0].replace(' ', '')
                email = user[1]
                password = 'admin'
                print('Creating account for %s (%s)' % (username, email))
                admin = Users.objects.create_superuser(  # type: ignore
                    email=email, username=username, password=password)
                admin.is_active = True
                admin.is_admin = True
                admin.save()
        else:
            print('Admin accounts can only be initialized if no Accounts exist')
