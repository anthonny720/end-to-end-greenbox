# Generated by Django 3.2 on 2022-12-07 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('raw_material', '0003_auto_20221130_1633'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicallot',
            name='certified',
        ),
        migrations.RemoveField(
            model_name='lot',
            name='certified',
        ),
        migrations.AlterField(
            model_name='historicallot',
            name='arrival_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Llegada a Planta'),
        ),
        migrations.AlterField(
            model_name='historicallot',
            name='departure_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Salida de Acopio'),
        ),
        migrations.AlterField(
            model_name='lot',
            name='arrival_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Llegada a Planta'),
        ),
        migrations.AlterField(
            model_name='lot',
            name='departure_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Salida de Acopio'),
        ),
    ]
