from rest_framework import serializers

from apps.costs.models import Report, Modality, Category, Group, SubGroup, ReportSubGroup


class ModalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Modality
        fields = ('name',)


class CategorySerializer(serializers.ModelSerializer):
    modality = ModalitySerializer()

    class Meta:
        model = Category
        fields = ('name','modality')


class GroupSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Group
        fields = ('category',)




class SubGroupSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = SubGroup
        exclude = ('cost','accounting_acount','type')


class DetailSerializer(serializers.ModelSerializer):
    subgroup = SubGroupSerializer()
    class Meta:
        model = ReportSubGroup
        fields = ('subgroup','cost')


class CostSerializer(serializers.ModelSerializer):
    item = DetailSerializer(source='report_groups',many=True)

    class Meta:
        model = Report
        fields = ('date','item')
