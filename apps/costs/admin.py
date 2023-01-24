from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from rest_framework.permissions import AllowAny
from simple_history.admin import SimpleHistoryAdmin

from apps.costs.models import Category, ReportCost, ReportCategory


# Register your models here.

@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'cost')
    list_filter = ('type',)
    list_per_page = 20


@admin.register(ReportCost)
class ReportAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'kg_processed', 'kg_total', 'get_performance',)
    list_filter = ('category',)
    date_hierarchy = 'date'
    list_per_page = 20


@admin.register(ReportCategory)
class ReportCategoryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('report', 'category', 'cost',)
    list_per_page = 20
