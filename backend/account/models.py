from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):
    def create_superuser(
        self, phone, password, email=None, **other_fields
    ):
        if not (phone or email):
            raise ValueError(
                "Either the Phone or Email field must be set for the superuser.")

        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True.")
        if other_fields.get("is_superuser") is not True:
            raise ValueError(
                "Superuser must be assigned to is_superuser=True.")

        user = self.model(phone=phone, email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(null=True, blank=True)
    user_photo = models.ImageField(
        upload_to='driver_photos/', null=True, blank=True, default="")
    address = models.CharField(max_length=255, null=True, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin_user = models.BooleanField(default=False)
    is_driver = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = "phone"
    EMAIL_FIELD = "email"

    def __str__(self):
        if self.is_admin_user:
            is_admin_user = True
            return f"Admin User: {self.phone} - {self.email}"
        else:
            return f"User: {self.phone} - {self.email} - Address: {self.address}"



class AdminUser(models.Model):
    user = models.OneToOneField(
        NewUser, null=True, on_delete=models.CASCADE)
    is_admin_user = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.phone} - {self.user.email}"

    def save(self, *args, **kwargs):
        if self.user and not self.user.is_admin_user:
            self.user.is_admin_user = True
            self.user.save()
        super(AdminUser, self).save(*args, **kwargs)



