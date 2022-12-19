# Generated by Django 3.2 on 2022-12-16 15:13

import apps.raw_material.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('raw_material', '0006_auto_20221216_1439'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicallot',
            name='docs',
            field=models.TextField(blank=True, max_length=100, null=True, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])], verbose_name='Documentos'),
        ),
        migrations.AlterField(
            model_name='historicallot',
            name='invoice',
            field=models.TextField(blank=True, max_length=100, null=True, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])], verbose_name='Factura'),
        ),
        migrations.AlterField(
            model_name='historicallot',
            name='tc',
            field=models.TextField(blank=True, max_length=100, null=True, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])], verbose_name='TC'),
        ),
        migrations.AlterField(
            model_name='lot',
            name='docs',
            field=models.FileField(blank=True, null=True, upload_to=apps.raw_material.models.custom_doc_file_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])], verbose_name='Documentos'),
        ),
        migrations.AlterField(
            model_name='lot',
            name='invoice',
            field=models.FileField(blank=True, null=True, upload_to=apps.raw_material.models.custom_invoice_file_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])], verbose_name='Factura'),
        ),
        migrations.AlterField(
            model_name='lot',
            name='tc',
            field=models.FileField(blank=True, null=True, upload_to=apps.raw_material.models.custom_tc_file_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])], verbose_name='TC'),
        ),
    ]