# Generated by Django 3.2 on 2023-01-17 17:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('costs', '0011_alter_reportsubgroup_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='reportsubgroup',
            unique_together=set(),
        ),
    ]