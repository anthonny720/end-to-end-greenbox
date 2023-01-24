from rest_framework import serializers

from apps.costs.models import ReportCost, Category, ReportCategory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name','type')

class DetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = ReportCategory
        fields = ('category', 'cost','id')


class CostSerializer(serializers.ModelSerializer):
    item = DetailSerializer(source='reports_category', many=True)
    mp=serializers.CharField(source='get_mp_name',read_only=True)
    week=serializers.CharField(source='get_week',read_only=True)
    year=serializers.CharField(source='get_year',read_only=True)
    performance=serializers.CharField(source='get_performance',read_only=True)
    total_cost=serializers.CharField(source='get_total_cost',read_only=True)
    total_cost_unit=serializers.CharField(source='get_total_cost_unit',read_only=True)
    total_cost_fixed=serializers.CharField(source='get_total_cost_fixed',read_only=True)
    total_cost_variable=serializers.CharField(source='get_total_cost_variable',read_only=True)
    item_fixed=serializers.DictField(source='get_item_fixed',read_only=True)
    item_variable=serializers.DictField(source='get_item_variable',read_only=True)

    class Meta:
        model = ReportCost
        fields = '__all__'

