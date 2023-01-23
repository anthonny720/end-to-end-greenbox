from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.raw_material.models import Lot


# Create your models here.
class Modality(models.Model):
    class Meta:
        verbose_name_plural = 'Modalidad'
        verbose_name = 'Modalidad'
        ordering = ['name']

    def __str__(self):
        return self.name

    name = models.CharField(max_length=100)


class Category(models.Model):
    class Meta:
        verbose_name_plural = 'Categoría'
        verbose_name = 'Categoría'
        ordering = ['name']

    def __str__(self):
        return self.name

    name = models.CharField(max_length=100)
    modality = models.ForeignKey(Modality, on_delete=models.PROTECT, related_name='categories')


class Group(models.Model):
    class Meta:
        verbose_name_plural = 'Grupo'
        verbose_name = 'Grupo'
        ordering = ['name']

    def __str__(self):
        return self.name

    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='groups')


class SubGroup(models.Model):
    class Meta:
        verbose_name_plural = 'Subgrupo'
        verbose_name = 'Subgrupo'
        ordering = ['name']

    def __str__(self):
        return self.name

    name = models.CharField(max_length=100)
    accounting_acount = models.CharField(max_length=100)
    type = models.CharField(max_length=1, choices=(('V', 'Variable'), ('F', 'Fijo')))
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    group = models.ForeignKey(Group, on_delete=models.PROTECT, related_name='subgroups')


class Report(models.Model):
    class Meta:
        verbose_name_plural = 'Reporte'
        verbose_name = 'Reporte'
        unique_together = ('date',)

    def __str__(self):
        return str(self.date)

    date = models.DateField()
    lot = models.ForeignKey(Lot, on_delete=models.PROTECT, related_name='reports_cost', null=True, blank=True,
                            verbose_name='Lote')
    kg_processed = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True,
                                       verbose_name='Kg Procesados')
    kg_total = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True,
                                   verbose_name='Kg Totales')
    item = models.ManyToManyField(SubGroup, related_name='reports', through='ReportSubGroup',
                                  through_fields=('report', 'subgroup'))

    def get_performance(self):
        return round((self.kg_total / self.kg_processed) * 100, 2)

    def get_lot_name(self):
        return self.lot.name

    def get_category(self):
        return self.lot.category.name

    def get_week(self):
        return self.date.isocalendar()[1]

    def get_year(self):
        return self.date.year


@receiver(post_save, sender=Report)
def update_cost(sender, instance, **kwargs):
    try:
        for field in SubGroup.objects.all():
            object = ReportSubGroup.objects.filter(report=instance, subgroup=field)
            if not object:
                ReportSubGroup.objects.create(report=instance, subgroup=field)
    except:
        pass


class ReportSubGroup(models.Model):
    class Meta:
        verbose_name_plural = 'Reporte Subgrupo'
        verbose_name = 'Reporte Subgrupo'

    def __str__(self):
        return str(self.report) + ' ' + str(self.subgroup)

    report = models.ForeignKey(Report, on_delete=models.PROTECT, related_name='report_groups')
    subgroup = models.ForeignKey(SubGroup, on_delete=models.PROTECT, related_name='report_subgroups')
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True, )

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        try:
            if self.subgroup.type == 'F':
                self.cost = self.subgroup.cost
        except Exception as e:
            pass
        super().save(force_insert, force_update, using, update_fields)
