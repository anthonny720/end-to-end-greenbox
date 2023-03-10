# Generated by Django 3.2 on 2023-01-17 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('process_line', '0005_auto_20221230_1148'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicalprocesslineconditioning',
            name='aspect',
        ),
        migrations.RemoveField(
            model_name='processlineconditioning',
            name='aspect',
        ),
        migrations.AddField(
            model_name='historicalprocesslineconditioning',
            name='appearance',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default='1', max_length=1, verbose_name='Apariencia'),
        ),
        migrations.AddField(
            model_name='historicalprocesslineconditioning',
            name='flavor',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default='1', max_length=1, verbose_name='Sabor'),
        ),
        migrations.AddField(
            model_name='historicalprocesslineconditioning',
            name='kg_processed',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Kg Procesados'),
        ),
        migrations.AddField(
            model_name='processlineconditioning',
            name='appearance',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default='1', max_length=1, verbose_name='Apariencia'),
        ),
        migrations.AddField(
            model_name='processlineconditioning',
            name='flavor',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default='1', max_length=1, verbose_name='Sabor'),
        ),
        migrations.AddField(
            model_name='processlineconditioning',
            name='kg_processed',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Kg Procesados'),
        ),
    ]
