from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.planning.models import IndicatorKPIAguaymanto, IndicatorKPIMango, IndicatorKPIPineapple


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
