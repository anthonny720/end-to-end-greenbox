from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from simple_history.models import HistoricalRecords

# Create your models here.

Roles = (('1', 'Operaciones'), ('2', 'Logistica'), ('3', 'Certificaciones'), ('4', 'Administración'), ('5', 'Calidad'),
         ('6', 'Materia Prima'), ('7', 'Producción'), ('8', 'Visualizador'),('9', 'Compras'),('10','Mantenimiento'))


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()
        user.role = '8'

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=2, choices=Roles, default='8')
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_role_name(self):
        return Roles[int(self.role) - 1][1]

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def get_short_name(self):
        return self.first_name

    def get_admin(self):
        return self.is_superuser

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'Usuarios'
        verbose_name = 'Usuario'
