from decimal import Decimal

from django.db import models
from simple_history.models import HistoricalRecords

from apps.management.models import Location
from apps.raw_material.models import Lot


# Create your models here.
class Report(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, verbose_name="Lote", related_name="report")

    price_camp = models.DecimalField(decimal_places=2, max_digits=4, default=0,
                                     verbose_name="Precio Campo")
    freight = models.DecimalField(decimal_places=4, max_digits=9, default=0, blank=True, null=True,
                                  verbose_name="Flete")
    observations = models.CharField(max_length=100, blank=True, null=True, verbose_name="Observaciones")
    type = models.CharField(choices=[("campo", "campo"), ("planta", "planta")], max_length=10, default="planta",
                            verbose_name="Referencia de Precio")
    type_kg = models.CharField(choices=[("guia", "guia"), ("neto", "neto"), ("bruto", "bruto")], max_length=10,
                               default="neto",
                               verbose_name="Referencia de kg aprovechables")
    type_discount = models.CharField(choices=[("guia", "guia"), ("neto", "neto"), ("bruto", "bruto")], max_length=10,
                                     default="neto",
                                     verbose_name="Referencia de kg a descontar")
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Registro"
        verbose_name_plural = "Registros"
        ordering = ["-id"]

    def get_quantity_boxes(self):
        try:
            return self.lot.get_quantity_boxes()
        except:
            return 0

    def get_origin(self):
        return self.lot.origin

    def get_parcel(self):
        try:
            return self.lot.parcel
        except:
            return "0"

    def get_brute_weight(self):
        try:
            return Decimal(self.lot.get_total_net_weight()) + Decimal(self.lot.get_weight_boxes())
        except:
            return 0

    def get_condition(self):
        try:
            return self.lot.condition
        except:
            return "0"

    def get_variety(self):
        try:
            return self.lot.variety
        except:
            return "0"

    def get_departure_time(self):
        try:
            return self.lot.departure_time
        except:
            return "0"

    def get_arrival_time(self):
        try:
            return self.lot.arrival_time
        except:
            return "0"

    def get_net_weight(self):
        try:
            return Decimal(self.lot.get_total_net_weight())
        except:
            return 0

    def get_provider_guide(self):
        try:
            return self.lot.providerGuide
        except:
            return "0"

    def get_weight_guide(self):
        try:
            return self.lot.weight_guide
        except:
            return 0

    def get_carrier_guide(self):
        try:
            return self.lot.carrierGuide
        except:
            return "0"

    def get_entry_date(self):
        try:
            return self.lot.entryDate
        except:
            return "0"

    def get_download_date(self):
        try:
            return self.lot.downloadDate
        except:
            return "0"

    def get_tare(self):
        try:
            return Decimal(self.get_brute_weight()) - Decimal(self.lot.get_total_net_weight())
        except:
            return 0

    def get_net_difference(self):
        try:
            return Decimal(self.lot.get_total_net_weight()) - Decimal(self.lot.weight_guide)
        except:
            return 0

    def get_discount_percentage(self):
        try:
            return self.lot.discount_percentage
        except:
            return 0

    def get_kg_discounted(self):
        try:
            if self.type_kg == "guia":
                return (Decimal(self.lot.weight_guide) * Decimal(self.get_discount_percentage())) / 100
            elif self.type_kg == "bruto":
                return (Decimal(self.get_brute_weight()) * Decimal(self.get_discount_percentage())) / 100
            else:
                return (Decimal(self.lot.get_total_net_weight()) * Decimal(self.get_discount_percentage())) / 100
        except:
            return 0

    def get_kg_usable(self):
        try:
            if self.type_kg == "guia":
                return Decimal(self.lot.weight_guide) - Decimal(self.get_kg_discounted())
            elif self.type_kg == "bruto":
                return Decimal(self.get_brute_weight()) - Decimal(self.get_kg_discounted())
            else:
                return Decimal(self.lot.get_total_net_weight()) - Decimal(self.get_kg_discounted())
        except Exception as e:
            return str(e)

    def get_discount_soles(self):
        try:
            return self.price_camp * self.get_kg_discounted()
        except:
            return 0

    def get_price_plant(self):
        try:
            return ((Decimal(self.get_kg_usable()) * Decimal(self.price_camp)) + Decimal(self.freight)) / Decimal(
                self.get_kg_usable())
        except:
            return 0

    def get_total_amount(self):
        try:
            if self.type == "campo":
                return self.get_kg_usable() * self.price_camp
            else:
                return self.get_kg_usable() * self.get_price_plant()
        except:
            return 0

    def get_year(self):
        try:
            return self.lot.entryDate.strftime('%Y')
        except:
            return "0"

    def get_month(self):
        try:
            return self.lot.entryDate.strftime('%B')
        except:
            return "0"

    def get_week(self):
        try:
            return self.lot.entryDate.isocalendar()[1]
        except:
            return 0

    def get_lot(self):
        return self.lot.lot

    def get_avg_box(self):
        try:
            return float(self.lot.get_total_net_weight()) / float(self.get_quantity_boxes())
        except:
            return 0

    def __str__(self):
        return self.lot.lot

    def get_provider(self):
        return self.lot.provider.name


class ReportPT(models.Model):
    date_process = models.DateField(verbose_name="Fecha de Proceso")
    kg_processed = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Kg Procesados",default=0)
    merma = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="Merma",default=0)
    kg_discarded = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Kg Descartados",default=0)
    class Meta:
        abstract = True

    def get_percentage_discarded(self):
        try:
            return float(self.kg_discarded) / float(self.kg_processed)*100
        except:
            return 0


    def get_net_weight(self):
        try:
            return float(self.kg_processed) - float(self.kg_discarded)
        except:
            return 0

    def get_percentage_merma(self):
        try:
            return (float(self.merma) / float(self.get_net_weight()))*100
        except:
            return 0


class ReportPTMango(ReportPT):
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, verbose_name="Lote", related_name="report_pt_mango")
    shell = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cascara",default=0)
    retail_slices= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Slices retail",default=0)
    retail_cachetes=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cachetes retail",default=0)
    retail_chunks=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Chunks retail",default=0)
    retail_cubs=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cubs retail",default=0)
    granel_slices=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Slices granel",default=0)
    granel_cachetes=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cachetes granel",default=0)
    granel_chunks=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Chunks granel",default=0)
    granel_cubs=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cubs granel",default=0)
    recoverable=models.DecimalField(max_digits=4,decimal_places=2,verbose_name="Recuperable",default=0)
    target=models.IntegerField(verbose_name="Target",default=11)


    def __str__(self):
        return self.lot.lot

    class Meta:
        verbose_name = "Reporte PT Mango"
        verbose_name_plural = "Reportes PT Mango"
        ordering = ["-date_process"]

    def get_lot_name(self):
        return self.lot.lot
    def get_dehydrated(self):
        try:
            return (float(self.lot.get_total_net_weight())-float(self.kg_processed))/float(self.lot.get_total_net_weight())*100
        except:
            return 0

    def get_percentage_shell(self):
        try:
            return float(self.shell)  / float(self.get_net_weight()) * 100
        except:
            return 0


    def get_kg_enabled(self):
        try:
            return float(self.get_net_weight()) - (float(self.shell)+float(self.merma))
        except:
            return 0

    def get_percentage_enabled(self):
        try:
            return float(self.get_kg_enabled())/float(self.get_net_weight())*100
        except:
            return 0
    def get_kg_pt(self):
        try:
            return self.retail_cubs+self.retail_chunks+self.retail_cachetes+self.retail_slices+self.granel_cubs+self.granel_chunks+self.granel_cachetes+self.granel_slices
        except:
            return 0

    def get_performance_usable(self):
        try:
            return float(self.get_kg_pt()) / float(self.lot.report.get_kg_usable()) * 100
        except:
            return 0

    def get_performance_net(self):
        try:
            return float(self.get_kg_pt()) / float(self.get_net_weight()) * 100
        except:
            return 0

    def get_kg_usable(self):
        try:
            return self.lot.report.get_kg_usable()
        except:
            return 0

class ReportPTBanana(ReportPT):
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, verbose_name="Lote", related_name="report_pt_banana")
    shell = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cascara",default=0)
    retail_slices= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Slices retail",default=0)
    retail_coins=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Coins retail",default=0)
    granel_slices=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Slices granel",default=0)
    granel_coins=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Coins granel",default=0)
    target=models.IntegerField(verbose_name="Target",default=11)


    def __str__(self):
        return self.lot.lot

    class Meta:
        verbose_name = "Reporte PT Banana"
        verbose_name_plural = "Reportes PT Banana"
        ordering = ["-date_process"]

    def get_lot_name(self):
        return self.lot.lot
    def get_dehydrated(self):
        try:
            return (float(self.lot.get_total_net_weight())-float(self.kg_processed))/float(self.lot.get_total_net_weight())*100
        except:
            return 0

    def get_percentage_shell(self):
        try:
            return float(self.kg_shell) / float(self.get_net_weight())*100
        except:
            return 0


    def get_kg_enabled(self):
        try:
            return float(self.get_net_weight()) - (float(self.shell)+float(self.merma))
        except:
            return 0

    def get_percentage_enabled(self):
        try:
            return float(self.get_kg_enabled())/float(self.get_net_weight())*100
        except:
            return 0
    def get_kg_pt(self):
        try:
            return self.retail_coins+self.retail_slices+self.granel_coins+self.granel_slices
        except:
            return 0
    def get_performance_usable(self):
        try:
            return float(self.get_kg_pt())/float(self.lot.report.get_kg_usable())*100
        except:
            return 0

    def get_performance_net(self):
        try:
            return float(self.get_kg_pt()) / float(self.get_net_weight()) * 100
        except:
            return 0

    def get_kg_usable(self):
        try:
            return self.lot.report.get_kg_usable()
        except:
            return 0

class ReportPTBlueberry(ReportPT):
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, verbose_name="Lote", related_name="report_pt_blueberry")
    retail_whole= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Enteros retail",default=0)
    retail_halves= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Mitades retail",default=0)
    granel_whole=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Enteros granel",default=0)
    granel_halves=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Mitades granel",default=0)
    target=models.IntegerField(verbose_name="Target",default=20)


    def __str__(self):
        return self.lot.lot

    class Meta:
        verbose_name = "Reporte PT Arándanos"
        verbose_name_plural = "Reportes PT Arándanos"
        ordering = ["-date_process"]

    def get_lot_name(self):
        return self.lot.lot
    def get_dehydrated(self):
        try:
            return (float(self.lot.get_total_net_weight())-float(self.kg_processed))/float(self.lot.get_total_net_weight())*100
        except:
            return 0

    def get_kg_enabled(self):
        try:
            return float(self.get_net_weight()) - float(self.merma)
        except:
            return 0

    def get_percentage_enabled(self):
        try:
            return float(self.get_kg_enabled())/float(self.get_net_weight())*100
        except:
            return 0
    def get_kg_pt(self):
        try:
            return self.retail_whole+self.retail_halves+self.granel_whole+self.granel_halves
        except:
            return 0
    def get_performance_usable(self):
        try:
            return float(self.get_kg_pt())/float(self.lot.report.get_kg_usable())*100
        except:
            return 0

    def get_performance_net(self):
        try:
            return float(self.get_kg_pt()) / float(self.get_net_weight()) * 100
        except:
            return 0

    def get_kg_usable(self):
        try:
            return self.lot.report.get_kg_usable()
        except:
            return 0

class ReportPTGoldenberry (ReportPT):
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, verbose_name="Lote", related_name="report_pt_goldenberry")
    caliz= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Caliz",default=0)
    retail_whole= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Enteros retail",default=0)
    retail_halves= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Mitades retail",default=0)
    retail_quarter= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cuartos retail",default=0)
    granel_whole=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Enteros granel",default=0)
    granel_halves=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Mitades granel",default=0)
    granel_quarter=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cuartos granel",default=0)
    target=models.IntegerField(verbose_name="Target",default=20)


    def __str__(self):
        return self.lot.lot

    class Meta:
        verbose_name = "Reporte PT Aguaymanto"
        verbose_name_plural = "Reportes PT Aguaymanto"
        ordering = ["-date_process"]

    def get_lot_name(self):
        return self.lot.lot
    def get_dehydrated(self):
        try:
            return (float(self.lot.get_total_net_weight())-float(self.kg_processed))/float(self.lot.get_total_net_weight())*100
        except:
            return 0

    def get_percentage_caliz(self):
        try:
            return (float(self.caliz)  / float(self.get_net_weight()))*100
        except:
            return 0

    def get_kg_enabled(self):
        try:
            return float(self.get_net_weight()) - float(self.merma) - float(self.caliz)
        except:
            return 0

    def get_percentage_enabled(self):
        try:
            return float(self.get_kg_enabled())/float(self.get_net_weight())*100
        except:
            return 0
    def get_kg_pt(self):
        try:
            return self.retail_whole+self.retail_halves+self.retail_quarter+self.granel_whole+self.granel_halves+self.granel_quarter
        except:
            return 0
    def get_performance_usable(self):
        try:
            return float(self.get_kg_pt())/float(self.lot.report.get_kg_usable())*100
        except:
            return 0

    def get_performance_net(self):
        try:
            return float(self.get_kg_pt()) / float(self.get_net_weight()) * 100
        except:
            return 0

    def get_kg_usable(self):
        try:
            return self.lot.report.get_kg_usable()
        except:
            return 0

class ReportPTPineapple (ReportPT):
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, verbose_name="Lote", related_name="report_pt_pineapple")
    shell= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Cascara y tronco",default=0)
    crown= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Corona",default=0)
    juice_pulp=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Jugo y pulpa",default=0)
    retail_rings= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Rings retail",default=0)
    retail_1_8= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="1/8 retail",default=0)
    retail_1_16= models.DecimalField(max_digits=10, decimal_places=2, verbose_name="1/16 retail",default=0)
    granel_rings=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Rings granel",default=0)
    granel_1_16=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="1/16 granel",default=0)
    granel_1_8=models.DecimalField(max_digits=10, decimal_places=2, verbose_name="1/8 granel",default=0)
    target=models.IntegerField(verbose_name="Target",default=20)


    def __str__(self):
        return self.lot.lot

    class Meta:
        verbose_name = "Reporte PT Piña"
        verbose_name_plural = "Reportes PT Piña"
        ordering = ["-date_process"]

    def get_lot_name(self):
        return self.lot.lot
    def get_dehydrated(self):
        try:
            return (float(self.lot.get_total_net_weight())-float(self.kg_processed))/float(self.lot.get_total_net_weight())*100
        except:
            return 0

    def get_percentage_crown(self):
        try:
            return (float(self.crown) ) / float(self.get_net_weight())*100
        except:
            return 0

    def get_percentage_shell(self):
        try:
            return (float(self.shell) / float(self.get_net_weight()))*100
        except:
            return 0

    def get_percentage_juice_pulp(self):
        try:
            return (float(self.juice_pulp)  / float(self.get_net_weight()))*100
        except:
            return 0

    def get_kg_enabled(self):
        try:
            return float(self.get_net_weight()) - float(self.merma) - float(self.crown)- float(self.juice_pulp)- float(self.shell)
        except:
            return 0

    def get_percentage_enabled(self):
        try:
            return float(self.get_kg_enabled())/float(self.get_net_weight())*100
        except:
            return 0
    def get_kg_pt(self):
        try:
            return self.retail_rings+self.retail_1_8+self.retail_1_16+self.granel_rings+self.granel_1_16+self.granel_1_8
        except:
            return 0
    def get_performance_usable(self):
        try:
            return float(self.get_kg_pt())/float(self.lot.report.get_kg_usable())*100
        except:
            return 0

    def get_performance_net(self):
        try:
            return float(self.get_kg_pt()) / float(self.get_net_weight()) * 100
        except:
            return 0

    def get_kg_usable(self):
        try:
            return self.lot.report.get_kg_usable()
        except:
            return 0