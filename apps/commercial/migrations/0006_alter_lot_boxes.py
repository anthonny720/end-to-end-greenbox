# Generated by Django 3.2 on 2022-12-07 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercial', '0005_auto_20221207_1622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lot',
            name='boxes',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='Cajas'),
        ),
    ]
