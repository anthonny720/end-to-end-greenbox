from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from rest_framework.permissions import AllowAny
from simple_history.admin import SimpleHistoryAdmin

from apps.costs.models import SubGroup, Group, Category, Modality, ReportSubGroup, Report


# Register your models here.
@admin.register(Modality)
class ModalityAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    list_per_page = 20
@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    list_filter = ('modality',)
    list_per_page = 20
@admin.register(Group)
class GroupAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    list_filter = ('category',)
    list_per_page = 20
@admin.register(SubGroup)
class SubGroupAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    list_filter = ('group',)
    list_per_page = 20
@admin.register(Report)
class ReportAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date',)
    list_per_page = 20
@admin.register(ReportSubGroup)
class ReportSubGroupAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    permission_classes = [AllowAny]
    list_display = ('report','subgroup','cost')
    list_per_page = 20
