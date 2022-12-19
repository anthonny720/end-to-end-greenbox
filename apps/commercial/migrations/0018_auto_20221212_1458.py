# Generated by Django 3.2 on 2022-12-12 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercial', '0017_historicalkardexcommercial_kardexcommercial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='historicalkardexcommercial',
            options={'get_latest_by': ('history_date', 'history_id'), 'ordering': ('-history_date', '-history_id'), 'verbose_name': 'historical Kardex ', 'verbose_name_plural': 'historical Kardex '},
        ),
        migrations.AlterModelOptions(
            name='kardexcommercial',
            options={'ordering': ['-date'], 'verbose_name': 'Kardex ', 'verbose_name_plural': 'Kardex '},
        ),
        migrations.AlterField(
            model_name='historicalkardexcommercial',
            name='input',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Entrada'),
        ),
        migrations.AlterField(
            model_name='historicalkardexcommercial',
            name='output',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Salida'),
        ),
        migrations.AlterField(
            model_name='kardexcommercial',
            name='input',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Entrada'),
        ),
        migrations.AlterField(
            model_name='kardexcommercial',
            name='output',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Salida'),
        ),
    ]
