# Generated by Django 3.2 on 2023-01-17 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('costs', '0012_alter_reportsubgroup_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reportsubgroup',
            name='cost',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
    ]