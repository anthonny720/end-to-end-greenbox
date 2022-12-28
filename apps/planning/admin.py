from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.planning.models import IndicatorKPIAguaymanto, IndicatorKPIMango, IndicatorKPIPineapple, IndicatorMaintenance


# Register your models here.
@admin.register(IndicatorKPIPineapple)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
        'get_week',
        'date', 'entry', 'discard', 'kg_brute', 'entry_objective', 'objective', 'price_objective',)
    date_hierarchy = 'date'


@admin.register(IndicatorKPIMango)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
        'get_week',
        'date', 'entry', 'discard', 'kg_brute', 'entry_objective', 'objective',
        'price_objective')
    date_hierarchy = 'date'


@admin.register(IndicatorKPIAguaymanto)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
        'get_week',
        'date', 'entry', 'discard', 'kg_brute', 'entry_objective', 'objective', 'price_objective')
    date_hierarchy = 'date'


@admin.register(IndicatorMaintenance)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('get_week', 'date', 'objective_glp',
                    'objective_machine',
                    'objective_works',
                    'objective_corrective',
                    'objective_preventive',
                    'objective_pnd',)

    date_hierarchy = 'date'
