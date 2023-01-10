from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.report.models import Report, ReportPTMango, ReportPTPineapple, ReportPTGoldenberry, ReportPTBlueberry, \
    ReportPTBanana


# Register your models here.
@admin.register(Report)
class ReportAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',
                    'price_camp',
                    'freight',
                    'observations',)
    list_per_page = 20
    date_hierarchy = 'lot__downloadDate'
    list_filter = ('lot__category', 'lot__downloadDate',)

@admin.register(ReportPTMango)
class ReportPTMangoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',
                    'date_process',
                    'kg_processed',)
    list_per_page = 20
    date_hierarchy = 'date_process'
    list_filter = ('lot__provider',)


@admin.register(ReportPTPineapple)
class ReportPTPineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',
                    'date_process',
                    'kg_processed',)
    list_per_page = 20
    date_hierarchy = 'date_process'
    list_filter = ('lot__provider',)

@admin.register(ReportPTGoldenberry)
class ReportPTGoldenberryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',
                    'date_process',
                    'kg_processed',)
    list_per_page = 20
    date_hierarchy = 'date_process'
    list_filter = ('lot__provider',)

@admin.register(ReportPTBlueberry)
class ReportPTBlueberryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',
                    'date_process',
                    'kg_processed',)
    list_per_page = 20
    date_hierarchy = 'date_process'
    list_filter = ('lot__provider',)

@admin.register(ReportPTBanana)
class ReportPTBananoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',
                    'date_process',
                    'kg_processed',)
    list_per_page = 20
    date_hierarchy = 'date_process'
    list_filter = ('lot__provider',)