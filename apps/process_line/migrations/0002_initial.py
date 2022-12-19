# Generated by Django 3.2 on 2022-11-28 12:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('process_line', '0001_initial'),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='processlinereleased',
            name='lot_bags',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='lot_bags_released', to='products.packingproduct', verbose_name='Lote de Bolsas'),
        ),
        migrations.AddField(
            model_name='processlinereleased',
            name='lot_boxes',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='lot_boxes_released', to='products.packingproduct', verbose_name='Lote de Cajas'),
        ),
        migrations.AddField(
            model_name='processlinereleased',
            name='process',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='process_line_released', to='process_line.processlineterminated', verbose_name='Proceso Terminado'),
        ),
    ]
