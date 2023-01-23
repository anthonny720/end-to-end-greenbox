from rest_framework import serializers

from apps.products.models import PackingProduct, Fruits


class PackingContainersSerializer(serializers.ModelSerializer):
    provider_name=serializers.CharField(source='provider.business_name', read_only=True)
    provider_ruc=serializers.CharField(source='provider.ruc', read_only=True)
    class Meta:
        model = PackingProduct
        fields = '__all__'


class FruitsSerializer(serializers.ModelSerializer):
    stock = serializers.CharField(source='get_stock', read_only=True)
    summary = serializers.CharField(source='get_motions', read_only=True)
    thumbnail = serializers.CharField(source='get_thumbnail', read_only=True)

    class Meta:
        model = Fruits
        fields = '__all__'
