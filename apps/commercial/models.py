import uuid
from datetime import datetime

from django.db import models
from django.db.models import Sum
from simple_history.models import HistoricalRecords

from apps.business_partners.models import Client, BusinessMaquila
from apps.warehouse.models import PackingList


class Family(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Familia'
        verbose_name_plural = 'Familia'


class Group(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Grupo'
        verbose_name_plural = 'Grupos'


class Type(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Tipo'
        verbose_name_plural = 'Tipos'


class Product(models.Model):
    name = models.CharField(max_length=60, unique=True, verbose_name='Nombre')
    family = models.ForeignKey(Family, on_delete=models.PROTECT, verbose_name='Familia', related_name='products',
                               blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'


class Cut(models.Model):
    name = models.CharField(max_length=50, verbose_name='Nombre')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name='Producto', related_name='cuts')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Corte'
        verbose_name_plural = 'Cortes'
        unique_together = ('name', 'product',)


class Variety(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name='Producto', related_name='varieties')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Variedad'
        verbose_name_plural = 'Variedades'


class Presentation(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Presentación'
        verbose_name_plural = 'Presentaciones'


class Packing(models.Model):
    name = models.CharField(max_length=50, verbose_name='Nombre')
    category = models.CharField(choices=(('1', 'Empaque'), ('2', 'Embajale')), max_length=1, default=1,
                                verbose_name='Categoría')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Empaque'
        verbose_name_plural = 'Empaques'
        unique_together = ('name', 'category')


class Condition(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Condición'
        verbose_name_plural = 'Condiciones'


class Lot(models.Model):
    name = models.CharField(max_length=50, verbose_name='Nombre')
    production_date = models.DateField(verbose_name='Fecha de producción', blank=True, null=True)
    expiring_date = models.DateField(verbose_name='Fecha de vencimiento', blank=True, null=True)
    boxes = models.IntegerField(verbose_name='Cajas', blank=True, null=True, default=0)
    bags = models.IntegerField(verbose_name='Cajas', blank=True, null=True, default=0)
    fcl = models.ForeignKey(PackingList, verbose_name='FCL', blank=True, null=True, on_delete=models.PROTECT,
                            related_name='fcl_lot')
    observation = models.TextField(verbose_name='Observación', blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.PROTECT, verbose_name='Grupo', related_name='group')
    type_inf = models.ForeignKey(Type, on_delete=models.PROTECT, verbose_name='Tipo', related_name='type', blank=True,
                                 null=True)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name='Producto', related_name='product_lot')
    pesticides = models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Pesticidas', blank=True, null=True, )
    fosetyl = models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Fosetil', blank=True, null=True, )
    cut = models.ForeignKey(Cut, blank=True, null=True, on_delete=models.PROTECT, verbose_name='Corte',
                            related_name='cut')
    variety = models.ForeignKey(Variety, blank=True, null=True, on_delete=models.PROTECT, verbose_name='Variedad',
                                related_name='variety')
    presentation = models.ForeignKey(Presentation, blank=True, null=True, on_delete=models.PROTECT,
                                     verbose_name='Presentación', related_name='presentation')
    packaging = models.ForeignKey(Packing, blank=True, null=True, on_delete=models.PROTECT, verbose_name='Embalaje',
                                  related_name='packaging')
    packing = models.ForeignKey(Packing, blank=True, null=True, on_delete=models.PROTECT, verbose_name='Empaque',
                                related_name='packing', )
    provider = models.ForeignKey(BusinessMaquila, on_delete=models.PROTECT, verbose_name='Proveedor',
                                 related_name='provider', blank=True, null=True)

    client = models.ForeignKey(Client, on_delete=models.PROTECT, verbose_name='Cliente', related_name='client',
                               blank=True, null=True)

    observations = models.TextField(verbose_name='Observaciones', blank=True, null=True)
    objective = models.DecimalField(default=0, verbose_name='Objective', max_digits=7, decimal_places=2, blank=True,
                                    null=True)
    slug = models.SlugField(max_length=50, null=True, default=uuid.uuid4, editable=False, unique=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    def get_stock(self):
        try:
            input = self.lot_kardex.all().aggregate(Sum('input'))['input__sum']
            output = self.lot_kardex.all().aggregate(Sum('output'))['output__sum']
            return input - output
        except:
            return 0

    def get_family(self):
        try:
            return self.product.family.name
        except:
            return 'Sin familia'

    def get_progress(self):
        try:
            return float(self.get_stock()) / float(self.objective) * 100
        except:
            return 0

    def get_summary(self):
        try:
            input = self.lot_kardex.all().aggregate(Sum('input'))['input__sum']
            output = self.lot_kardex.all().aggregate(Sum('output'))['output__sum']
            input_month = self.lot_kardex.filter(date__month=datetime.now().month).aggregate(Sum('input'))['input__sum']
            output_month = self.lot_kardex.filter(date__month=datetime.now().month).aggregate(Sum('output'))[
                'output__sum']
            return {'input': input, 'output': output, 'input_month': input_month, 'output_month': output_month}
        except:
            return 'Sin resumen'

    class Meta:
        ordering = ['-id']
        verbose_name = 'Lotes'
        verbose_name_plural = 'Lotes'


class KardexCommercial(models.Model):
    date = models.DateField(verbose_name='Fecha')
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, verbose_name='Lote', related_name='lot_kardex')
    input = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Entrada', blank=True, null=True,
                                default=0)
    output = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Salida', blank=True, null=True,
                                 default=0)
    history = HistoricalRecords()

    def __str__(self):
        return self.lot.name

    class Meta:
        ordering = ['-date']
        verbose_name = 'Kardex '
        verbose_name_plural = 'Kardex '
        unique_together = ('date', 'lot')
