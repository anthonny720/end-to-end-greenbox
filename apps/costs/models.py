from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.products.models import Fruits


# Create your models here.

class Category(models.Model):
    class Meta:
        verbose_name_plural = 'Categoría'
        verbose_name = 'Categoría'
        ordering = ['name']

    def __str__(self):
        return self.name

    name = models.CharField(max_length=100, verbose_name='Nombre')
    type = models.CharField(max_length=1, choices=(('V', 'Variable'), ('F', 'Fijo')), verbose_name='Tipo')
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='Costo')


class ReportCost(models.Model):
    class Meta:
        verbose_name_plural = 'Reporte'
        verbose_name = 'Reporte'
        unique_together = ('date',)

    def __str__(self):
        return str(self.date)

    date = models.DateField()
    category = models.ForeignKey(Fruits, on_delete=models.PROTECT, related_name='reports_category', null=True,
                                 blank=True,
                                 verbose_name='Materia prima')
    kg_processed = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True,
                                       verbose_name='Kg Procesados')
    kg_total = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True,
                                   verbose_name='Kg PT')
    item = models.ManyToManyField(Category, verbose_name='Categoría', related_name='reports', through='ReportCategory',
                                  through_fields=('report', 'category'))

    def get_performance(self):
        try:
            return round((self.kg_total / self.kg_processed) * 100, 2)
        except:
            return 0

    def get_mp_name(self):
        if self.category:
            return self.category.name
        else:
            return ''

    def get_total_cost_fixed(self):
        try:
            query = ReportCategory.objects.filter(report=self)
            return sum([item.cost for item in query if item.category.type == 'F'])
        except:
            return 0

    def get_total_cost_variable(self):
        try:
            query = ReportCategory.objects.filter(report=self)
            return sum([item.cost for item in query if item.category.type == 'V'])
        except:
            return 0

    def get_total_cost(self):
        try:

            return self.get_total_cost_fixed() + self.get_total_cost_variable()
        except:
            return 0

    def get_total_cost_unit(self):
        try:
            return self.get_total_cost() / self.kg_total
        except:
            return 0

    def get_item_fixed(self):
        list = {}
        try:
            query = ReportCategory.objects.filter(report=self)
            for item in query:
                if item.category.type == 'F':
                    list[item.category.name] = {'id': item.id, 'cost': item.cost, 'name': item.category.name}
            return list
        except Exception as e:
            return list

    def get_item_variable(self):
        list = {}
        try:
            query = ReportCategory.objects.filter(report=self)
            for item in query:
                if item.category.type == 'V':
                    list[item.category.name] = {'id': item.id, 'cost': item.cost, 'name': item.category.name}
            return list
        except Exception as e:
            return list

    def get_week(self):
        return self.date.isocalendar()[1]

    def get_year(self):
        return self.date.year


@receiver(post_save, sender=ReportCost)
def update_cost(sender, instance, **kwargs):
    try:
        for field in Category.objects.all():
            object = ReportCategory.objects.filter(report=instance, category=field)
            if not object:
                ReportCategory.objects.create(report=instance, category=field)
    except:
        pass


class ReportCategory(models.Model):
    class Meta:
        verbose_name_plural = 'Reporte Categoría'
        verbose_name = 'Reporte Categoría'
        ordering = ['category__type']

    def __str__(self):
        return str(self.report) + ' ' + str(self.category.name)

    report = models.ForeignKey(ReportCost, on_delete=models.PROTECT, related_name='reports_category',
                               verbose_name='Reporte')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='report_category',
                                 verbose_name='Categoría')
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True, verbose_name='Costo')

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        try:
            if self.category.type == 'F':
                self.cost = self.category.cost
        except Exception as e:
            pass
        super().save(force_insert, force_update, using, update_fields)
