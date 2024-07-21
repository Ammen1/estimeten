from django.contrib import admin
from core.account.models import (
    NewUser,
    AdminUser,
)

admin.site.register(NewUser)
admin.site.register(AdminUser)

