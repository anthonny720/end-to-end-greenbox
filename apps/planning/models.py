from django.db import models

from apps.management.models import Kardex
from apps.raw_material.models import Lot


# Create your models here.

class IndicatorKPI(models.Model):
    date = models.DateField(verbose_name="Fecha de ingreso", unique=True)
    entry = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True,
                                verbose_name="Ingreso proyectado")
    discard = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True,
                                  verbose_name='Descarte')
    kg_brute = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True,
                                   verbose_name='Kg Bruto Procesado')
    entry_objective = models.IntegerField(default=100, verbose_name='Objetivo de ingreso', blank=True, null=True)

    def __str__(self):
        return str(self.date)

    def get_week(self):
        try:
            return self.date.isocalendar()[1]
        except:
            return 0

    def get_year(self):
        try:
            return self.date.strftime('%Y')
        except:
            return "0"

    def get_month(self):
        try:
            return self.date.strftime('%B')
        except:
            return "0"

    class Meta:
        verbose_name = 'Indicador'
        verbose_name_plural = 'Indicadores'
        ordering = ['-date']
        abstract = True


class IndicatorKPIPineapple(IndicatorKPI):
    objective = models.IntegerField(default=90, verbose_name='Objetivo de producción', blank=True)
    price_objective = models.DecimalField(max_digits=7, decimal_places=2, default=1.66, verbose_name='Precio objetivo',
                                          blank=True)
    lots = models.ManyToManyField(Lot, blank=True, verbose_name='Lotes')

    class Meta:
        verbose_name = "Indicador de Piña"
        verbose_name_plural = "Indicador de Piña"
        ordering = ['-date']

    def get_entry_real(self):
        entry_real = 0.0
        try:
            for lot in self.lots.all():
                entry_real += float(lot.get_total_net_weight())
            return entry_real
        except:
            return 0

    def get_compliance_entry(self):
        try:
            return float(self.get_entry_real()) / float(self.entry) * 100
        except Exception as e:
            return 0

    def get_calibers_maduration(self):
        caliber_6 = 0
        caliber_8_10_12 = 0
        caliber_14 = 0
        maduration_0 = 0
        maduration_1 = 0
        maduration_2_3 = 0
        maduration_4_5 = 0
        information = {'caliber_6': caliber_6,
                       'caliber_8_10_12': caliber_8_10_12,
                       'caliber_14': caliber_14,
                       'maduration_0': maduration_0,
                       'maduration_1': maduration_1,
                       'maduration_2_3': maduration_2_3,
                       'maduration_4_5': maduration_4_5}
        try:
            for lot in self.lots.all():
                caliber_6 += lot.get_calibers_percentage()['c6'] * lot.get_total_net_weight()

                caliber_8_10_12 += lot.get_total_net_weight() * (
                        lot.get_calibers_percentage()['c8'] + lot.get_calibers_percentage()['c10'] +
                        lot.get_calibers_percentage()['c12'])
                caliber_14 += lot.get_calibers_percentage()['c14'] * lot.get_total_net_weight()

                maduration_0 += float(lot.analysis_pineapple.maturation_0_plant) * lot.get_total_net_weight()
                maduration_1 += float(lot.analysis_pineapple.maturation_1_plant) * lot.get_total_net_weight()
                maduration_2_3 += lot.get_total_net_weight() * (
                        float(lot.analysis_pineapple.maturation_2_plant) + float(
                    lot.analysis_pineapple.maturation_3_plant))
                maduration_4_5 += float(lot.analysis_pineapple.maturation_0_plant) * lot.get_total_net_weight()

            information['caliber_6'] = caliber_6 / self.get_entry_real()
            information['caliber_8_10_12'] = caliber_8_10_12 / self.get_entry_real()
            information['caliber_14'] = caliber_14 / self.get_entry_real()
            information['maduration_0'] = maduration_0 / self.get_entry_real()
            information['maduration_1'] = maduration_1 / self.get_entry_real()
            information['maduration_2_3'] = maduration_2_3 / self.get_entry_real()
            information['maduration_4_5'] = maduration_4_5 / self.get_entry_real()

            return information
        except Exception as e:
            return information

    def get_condition(self):
        organic = 0
        convencional = 0
        try:
            for lot in self.lots.all():
                if lot.condition == 'Orgánico' or lot.condition == 'Organico' or lot.condition == 'ORGANICO' or lot.condition == 'ORGÁNICO':
                    organic += lot.get_total_net_weight()
                else:
                    convencional += lot.get_total_net_weight()
            return {'organic': organic, 'convencional': convencional}
        except Exception as e:
            return {'organic': organic, 'convencional': convencional}

    def get_stock(self):
        stock = 0
        try:
            q = Kardex.objects.filter(date=self.date, category__name='Piña').first()
            return q.stock
        except Exception as e:
            return 0

    def get_compliance_production(self):
        try:
            return 100 - (float(self.discard) / float(self.kg_brute) * 100)
        except:
            return 0

    def get_price(self):
        price = 0
        total = 0
        kg = 0
        try:
            for lot in self.lots.all():
                kg += lot.report.get_kg_usable()
                total += lot.report.get_total_amount()
            return total / kg
        except Exception as e:
            return 0


class IndicatorKPIMango(IndicatorKPI):
    objective = models.IntegerField(default=97, verbose_name='Objetivo de producción', blank=True)
    price_objective = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Precio objetivo',
                                          blank=True, null=True, default=1.66)
    lots = models.ManyToManyField(Lot, blank=True, verbose_name='Lotes', )

    class Meta:
        verbose_name = "Indicador de Mango"
        verbose_name_plural = "Indicador de Mango"
        ordering = ['-date']

    def get_entry_real(self):
        entry_real = 0
        try:
            for lot in self.lots.all():
                entry_real += lot.get_total_net_weight()
            return entry_real
        except:
            return 0

    def get_compliance_entry(self):
        try:
            return float(self.get_entry_real()) / float(self.entry) * 100
        except:
            return 0

    def get_compliance_production(self):
        try:
            return 100 - (float(self.discard) / float(self.kg_brute) * 100)
        except:
            return 0

    def get_info(self):
        wt_280 = 0
        wt_280_300 = 0
        wt_300 = 0
        color_1 = 0
        color_1_5_2_5 = 0
        color_3 = 0
        mechanical_damage = 0
        physical_damage = 0
        plagues = 0
        others = 0
        total = 0
        information = {'wt_280': wt_280,
                       'wt_280_300': wt_280_300,
                       'wt_300': wt_300,
                       'color_1': color_1,
                       'color_1_5_2_5': color_1_5_2_5,
                       'color_3': color_3,
                       'mechanical_damage': mechanical_damage,
                       'physical_damage': physical_damage,
                       'plagues': plagues,
                       'others': others,
                       'total': total}
        try:
            for lot in self.lots.all():
                wt_280 += float(lot.analysis_mango.weight_280) * lot.get_total_net_weight()
                wt_280_300 += float(lot.analysis_mango.weight_280_300) * lot.get_total_net_weight()
                wt_300 += float(lot.analysis_mango.weight_300) * lot.get_total_net_weight()
                color_1 += float(lot.analysis_mango.color_1) * lot.get_total_net_weight()
                color_1_5_2_5 += float(lot.get_total_net_weight()) * (
                        float(lot.analysis_mango.color_1_5) + float(lot.analysis_mango.color_2_5) + float(
                    lot.analysis_mango.color_2))
                color_3 += (float(lot.analysis_mango.color_3_5) + float(
                    lot.analysis_mango.color_3)) * lot.get_total_net_weight()
                mechanical_damage += lot.get_total_net_weight() * (
                        float(lot.analysis_mango.mechanical_damage) + float(lot.analysis_mango.cracked))
                physical_damage += lot.get_total_net_weight() * (
                        float(lot.analysis_mango.sun_damage) + float(lot.analysis_mango.latex) + float(
                    lot.analysis_mango.soft))
                plagues += lot.get_total_net_weight() * (
                        float(lot.analysis_mango.anthracnose) + float(lot.analysis_mango.queresa) + float(
                    lot.analysis_mango.insect_bite))
                others += lot.get_total_net_weight() * (
                        float(lot.analysis_mango.rot) + float(lot.analysis_mango.mature) + float(
                    lot.analysis_mango.advanced))

            information['wt_280'] = wt_280 / self.get_entry_real()
            information['wt_280_300'] = wt_280_300 / self.get_entry_real()
            information['wt_300'] = wt_300 / self.get_entry_real()
            information['color_1'] = color_1 / self.get_entry_real()
            information['color_1_5_2_5'] = color_1_5_2_5 / self.get_entry_real()
            information['color_3'] = color_3 / self.get_entry_real()
            information['mechanical_damage'] = mechanical_damage / self.get_entry_real()
            information['physical_damage'] = physical_damage / self.get_entry_real()
            information['plagues'] = plagues / self.get_entry_real()
            information['others'] = others / self.get_entry_real()
            information['total'] = (
                                           mechanical_damage + physical_damage + plagues + others) / self.get_entry_real() if self.get_entry_real() > 0 else 0
            return information
        except Exception as e:
            return information

    def get_variety(self):
        kent = 0
        edward = 0
        haden = 0
        others = 0
        try:

            for lot in self.lots.all():
                if lot.variety == 'Kent' or lot.variety == 'KENT' or lot.variety == 'kent':
                    kent += lot.get_total_net_weight()
                elif lot.variety == 'Edward' or lot.variety == 'EDWARD' or lot.variety == 'edward':
                    edward += lot.get_total_net_weight()
                elif lot.variety == 'Haden' or lot.variety == 'HADEN' or lot.variety == 'haden':
                    haden += lot.get_total_net_weight()
                else:
                    others += lot.get_total_net_weight()
            return {'kent': kent, 'edward': edward, 'haden': haden, 'others': others}
        except Exception as e:
            return {'kent': kent, 'edward': edward, 'haden': haden, 'others': others}

    def get_stock(self):
        stock = ''
        try:
            q = Kardex.objects.filter(date=self.date, category__name='Mango').first()
            return q.stock
        except:
            return 0

    def get_price(self):
        price = 0
        total = 0
        kg = 0
        try:
            for lot in self.lots.all():
                kg += lot.report.get_kg_usable()
                total += lot.report.get_total_amount()
            return total / kg
        except Exception as e:
            return 0


class IndicatorKPIAguaymanto(IndicatorKPI):
    objective = models.IntegerField(default=90, verbose_name='Objetivo de producción', blank=True)
    price_objective = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Precio objetivo',
                                          blank=True, null=True)
    lots = models.ManyToManyField(Lot, blank=True, verbose_name='Lotes')
    discard = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Descarte', blank=True, null=True)
    caliz = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Caliz', blank=True, null=True)
    discard_objective = models.DecimalField(max_digits=7, decimal_places=2, default=5, verbose_name='Caliz', blank=True)

    class Meta:
        verbose_name = "Indicador de Aguaymanto"
        verbose_name_plural = "Indicador de Aguaymanto"
        ordering = ['-date']

    def get_entry_real(self):
        entry_real = ''
        try:
            for lot in self.lots.all():
                entry_real += lot.get_total_net_weight()
            return entry_real
        except:
            return 0

    def get_maduration_defects(self):
        maduration_1 = 0
        maduration_2 = 0
        maduration_3 = 0
        mushroom = 0
        green = 0
        cracked = 0
        crushed = 0
        information = {'maduration_1': maduration_1,
                       'maduration_2': maduration_2,
                       'maduration_3': maduration_3,
                       'mushroom': mushroom,
                       'green': green,
                       'cracked': cracked,
                       'crushed': crushed}
        try:
            for lot in self.lots.all():
                maduration_1 += float(lot.analysis_aguaymanto.maturation_1) * lot.get_total_net_weight()
                maduration_2 += float(lot.analysis_aguaymanto.maturation_2) * lot.get_total_net_weight()
                maduration_3 += float(lot.analysis_aguaymanto.maturation_3) * lot.get_total_net_weight()

                mushroom += float(lot.analysis_aguaymanto.mushroom) * lot.get_total_net_weight()
                green += float(lot.analysis_aguaymanto.green) * lot.get_total_net_weight()
                cracked += float(lot.analysis_aguaymanto.cracked) * lot.get_total_net_weight()
                crushed += float(lot.analysis_aguaymanto.crushed) * lot.get_total_net_weight()

            information['maduration_1'] = maduration_1 / self.get_entry_real()
            information['maduration_2'] = maduration_2 / self.get_entry_real()
            information['maduration_3'] = maduration_3 / self.get_entry_real()
            information['mushroom'] = mushroom / self.get_entry_real()
            information['green'] = green / self.get_entry_real()
            information['cracked'] = cracked / self.get_entry_real()
            information['crushed'] = crushed / self.get_entry_real()

            return information
        except Exception as e:
            return information

    def get_compliance_production(self):
        try:
            return 100 - (float(self.caliz) / float(self.kg_brute) * 100)
        except:
            return 0

    def get_percentage_discard(self):
        try:
            return float(self.discard) / float(self.kg_brute) * 100
        except:
            return 0

    def get_price(self):
        price = 0
        total = 0
        kg = 0
        try:
            for lot in self.lots.all():
                kg += lot.report.get_kg_usable()
                total += lot.report.get_total_amount()
            return total / kg
        except Exception as e:
            return 0

    def get_compliance_entry(self):
        try:
            return float(self.get_entry_real()) / float(self.entry) * 100
        except:
            return 0

    def get_stock(self):
        try:
            q = Kardex.objects.filter(date=self.date, category__name='Aguaymanto').first()
            return q.stock
        except:
            return 0
