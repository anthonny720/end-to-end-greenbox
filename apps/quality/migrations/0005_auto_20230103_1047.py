# Generated by Django 3.2 on 2023-01-03 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quality', '0004_auto_20221230_1148'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analysisaguaymanto',
            name='small',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=4, null=True, verbose_name='Pequeño<17mm'),
        ),
        migrations.AlterField(
            model_name='historicalanalysisaguaymanto',
            name='small',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=4, null=True, verbose_name='Pequeño<17mm'),
        ),
    ]