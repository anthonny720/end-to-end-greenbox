# Generated by Django 3.2 on 2022-12-07 16:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('raw_material', '0004_auto_20221207_1156'),
    ]

    operations = [
        migrations.RenameField(
            model_name='historicallot',
            old_name='arrival_time',
            new_name='arrival',
        ),
        migrations.RenameField(
            model_name='historicallot',
            old_name='departure_time',
            new_name='departure',
        ),
        migrations.RenameField(
            model_name='lot',
            old_name='arrival_time',
            new_name='arrival',
        ),
        migrations.RenameField(
            model_name='lot',
            old_name='departure_time',
            new_name='departure',
        ),
    ]
