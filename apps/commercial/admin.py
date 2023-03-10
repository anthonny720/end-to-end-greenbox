from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.commercial.models import Lot, Condition, Packing, Presentation, Variety, Cut, Product, Type, \
    Group, Family, KardexCommercial


# Register your models here.
@admin.register(Lot)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',
                    'boxes',
                    'bags',
                    'group',
                    'product',
                    'cut',
                    )
    search_fields = ('name', 'product',)
    list_per_page = 20
    date_hierarchy = 'production_date'
    list_filter = ('product', 'group', 'presentation', 'product__family')


@admin.register(Family)
class FamilyAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_per_page = 20


@admin.register(Group)
class GroupAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_per_page = 20


@admin.register(Type)
class TypeAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_per_page = 20


@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'family')
    search_fields = ('name',)
    list_editable = ('family',)
    list_per_page = 20


@admin.register(Cut)
class CutAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_per_page = 20


@admin.register(Variety)
class VarietyAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_per_page = 20


@admin.register(Presentation)
class PresentationAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_per_page = 20


@admin.register(Packing)
class PackingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name','category',)
    search_fields = ('name',)
    list_filter = ('category',)
    list_editable = ('category',)
    list_per_page = 20


@admin.register(Condition)
class ConditionAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_per_page = 20


@admin.register(KardexCommercial)
class KardexAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot', 'input', 'output',)
    search_fields = ('lot',)
    date_hierarchy = 'date'
    list_per_page = 20
