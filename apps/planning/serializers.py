from rest_framework import serializers

from apps.planning.models import IndicatorKPIPineapple, IndicatorKPIMango, IndicatorKPIAguaymanto, IndicatorKPI, \
    IndicatorMaintenance
from apps.raw_material.models import Lot


class Indicator(serializers.ModelSerializer):
    year = serializers.CharField(source='get_year', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)

    class Meta:
        model = IndicatorKPI
        fields = '__all__'


class LotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lot
        fields = ('lot', 'get_total_net_weight',)


class IndicatorPineappleSerializer(Indicator):
    lots = LotSerializer(many=True, read_only=True)
    price = serializers.CharField(source='get_price', read_only=True)
    entry_real = serializers.CharField(source='get_entry_real', read_only=True)
    compliance_entry = serializers.CharField(source='get_compliance_entry', read_only=True)
    info = serializers.DictField(source='get_calibers_maduration', read_only=True)
    condition = serializers.DictField(source='get_condition', read_only=True)
    compliance_production = serializers.CharField(source='get_compliance_production', read_only=True)
    stock = serializers.CharField(source='get_stock', read_only=True)

    class Meta:
        model = IndicatorKPIPineapple
        fields = '__all__'


class IndicatorMangoSerializer(Indicator):
    lots = LotSerializer(many=True, read_only=True)
    price = serializers.CharField(source='get_price', read_only=True)
    entry_real = serializers.CharField(source='get_entry_real', read_only=True)
    compliance_entry = serializers.CharField(source='get_compliance_entry', read_only=True)
    info = serializers.DictField(source='get_info', read_only=True)
    compliance_production = serializers.CharField(source='get_compliance_production', read_only=True)
    variety = serializers.DictField(source='get_variety', read_only=True)
    stock = serializers.CharField(source='get_stock', read_only=True)

    class Meta:
        model = IndicatorKPIMango
        fields = '__all__'


class IndicatorAguaymantoSerializer(Indicator):
    lots = LotSerializer(many=True, read_only=True)
    price = serializers.CharField(source='get_price', read_only=True)
    entry_real = serializers.CharField(source='get_entry_real', read_only=True)
    compliance_entry = serializers.CharField(source='get_compliance_entry', read_only=True)
    info = serializers.DictField(source='get_maduration_defects', read_only=True)
    compliance_production = serializers.CharField(source='get_compliance_production', read_only=True)
    discard_percentage = serializers.CharField(source='get_percentage_discard', read_only=True)
    stock = serializers.CharField(source='get_stock', read_only=True)

    class Meta:
        model = IndicatorKPIAguaymanto
        fields = '__all__'


class IndicatorMaintenanceSerializer(serializers.ModelSerializer):
    week = serializers.CharField(source='get_week', read_only=True, )
    consumption_real = serializers.CharField(source='get_consumption_real', read_only=True, )
    efficiency_machine = serializers.CharField(source='get_efficiency_machine', read_only=True, )
    work_executed = serializers.CharField(source='get_work_executed', read_only=True)
    compliance_works = serializers.CharField(source='get_compliance_works', read_only=True, )
    compliance_corrective = serializers.CharField(source='get_compliance_corrective', read_only=True, )
    compliance_preventive = serializers.CharField(source='get_compliance_preventive', read_only=True, )
    efficiency_pnd = serializers.CharField(source='get_efficiency_pnd', read_only=True)

    class Meta:
        model = IndicatorMaintenance
        fields = '__all__'
