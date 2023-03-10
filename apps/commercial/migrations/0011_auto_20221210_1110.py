# Generated by Django 3.2 on 2022-12-10 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercial', '0010_auto_20221210_1047'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicallot',
            name='progress',
        ),
        migrations.RemoveField(
            model_name='lot',
            name='progress',
        ),
        migrations.AddField(
            model_name='historicallot',
            name='objective',
            field=models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Objective'),
        ),
        migrations.AddField(
            model_name='historicallot',
            name='observations',
            field=models.TextField(blank=True, null=True, verbose_name='Observaciones'),
        ),
        migrations.AddField(
            model_name='lot',
            name='objective',
            field=models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Objective'),
        ),
        migrations.AddField(
            model_name='lot',
            name='observations',
            field=models.TextField(blank=True, null=True, verbose_name='Observaciones'),
        ),
    ]
