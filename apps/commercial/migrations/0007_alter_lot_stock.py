# Generated by Django 3.2 on 2022-12-10 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercial', '0006_alter_lot_boxes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lot',
            name='stock',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Stock'),
        ),
    ]
