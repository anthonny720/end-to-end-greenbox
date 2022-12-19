# Generated by Django 3.2 on 2022-11-28 12:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('raw_material', '0002_initial'),
        ('report', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalreport',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalreport',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote'),
        ),
    ]
