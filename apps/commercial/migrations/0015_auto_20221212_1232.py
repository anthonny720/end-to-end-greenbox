# Generated by Django 3.2 on 2022-12-12 12:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commercial', '0014_auto_20221212_1218'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicallot',
            name='condition',
        ),
        migrations.RemoveField(
            model_name='lot',
            name='condition',
        ),
    ]
