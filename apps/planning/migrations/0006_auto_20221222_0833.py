# Generated by Django 3.2 on 2022-12-22 08:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planning', '0005_auto_20221221_1457'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='indicatorkpipineapple',
            options={'verbose_name': 'Indicador de Piña', 'verbose_name_plural': 'Indicador de Piña'},
        ),
        migrations.RemoveField(
            model_name='indicatorkpiaguaymanto',
            name='entry_real',
        ),
        migrations.RemoveField(
            model_name='indicatorkpimango',
            name='entry_real',
        ),
        migrations.RemoveField(
            model_name='indicatorkpipineapple',
            name='entry_real',
        ),
    ]