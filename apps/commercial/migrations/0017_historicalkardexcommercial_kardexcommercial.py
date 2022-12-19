# Generated by Django 3.2 on 2022-12-12 14:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('commercial', '0016_auto_20221212_1319'),
    ]

    operations = [
        migrations.CreateModel(
            name='KardexCommercial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('input', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Entrada')),
                ('output', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Salida')),
                ('lot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lot_kardex', to='commercial.lot', verbose_name='Lote')),
            ],
            options={
                'verbose_name': 'Kardex comercial',
                'verbose_name_plural': 'Kardex comerciales',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalKardexCommercial',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('input', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Entrada')),
                ('output', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Salida')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='commercial.lot', verbose_name='Lote')),
            ],
            options={
                'verbose_name': 'historical Kardex comercial',
                'verbose_name_plural': 'historical Kardex comerciales',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
