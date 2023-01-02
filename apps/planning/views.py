from datetime import datetime

from django.db.models import Sum
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.planning.models import IndicatorKPIPineapple, IndicatorKPIMango, IndicatorKPIAguaymanto, IndicatorMaintenance
from apps.planning.serializers import IndicatorPineappleSerializer, IndicatorMangoSerializer, \
    IndicatorAguaymantoSerializer, IndicatorMaintenanceSerializer


# Create your views here.

class ListPineappleView(APIView):
    def get(self, request):
        queryset = IndicatorKPIPineapple.objects.all().order_by('-date')
        week = request.query_params.get('week', None)
        year = request.query_params.get('year', None)

        if week:
            queryset = queryset.filter(date__week=week)
        if year:
            queryset = queryset.filter(date__year=year)
        else:
            queryset = queryset.filter(date__year=datetime.now().year)

        if queryset.exists():
            serializer = IndicatorPineappleSerializer(queryset, many=True)
            count = queryset.count()
            total = queryset.filter(price_objective__gte=0.1).count()
            total_entry = 0
            total_real_entry = 0
            total_c6 = 0
            total_c8_10_12 = 0
            total_c14 = 0
            total_maduration_0 = 0
            total_maduration_1 = 0
            total_maduration_2_3 = 0
            total_maduration_4_5 = 0
            total_discard = 0
            total_kg_brute = 0
            total_price = 0
            total_convencional = 0
            total_organic = 0
            total_objective_entry = 0
            total_objective_production = 0
            total_objective_price = 0
            for data in queryset:
                if data.lots is not None and data.lots.count() > 0:
                    total_c6 += data.get_calibers_maduration()['caliber_6']
                    total_c8_10_12 += data.get_calibers_maduration()['caliber_8_10_12']
                    total_c14 += data.get_calibers_maduration()['caliber_14']
                    total_maduration_0 += data.get_calibers_maduration()['maduration_0']
                    total_maduration_1 += data.get_calibers_maduration()['maduration_1']
                    total_maduration_2_3 += data.get_calibers_maduration()['maduration_2_3']
                    total_maduration_4_5 += data.get_calibers_maduration()['maduration_4_5']
                    total_price += float(data.get_price()) if data.get_price() else 0
                    total_convencional += data.get_condition()['convencional']
                    total_organic += data.get_condition()['organic']
                total_entry += data.entry if data.entry else 0
                total_real_entry += data.get_entry_real()
                total_objective_entry += data.entry_objective
                total_objective_production += data.objective
                total_objective_price += data.price_objective
                total_discard += data.discard if data.discard else 0
                total_kg_brute += data.kg_brute if data.kg_brute else 0
            summary = {'total_entry': total_entry,
                       'total_real_entry': total_real_entry,
                       'total_c6': total_c6,
                       'total_c8_10_12': total_c8_10_12,
                       'total_c14': total_c14,
                       'total_maduration_0': total_maduration_0,
                       'total_maduration_1': total_maduration_1,
                       'total_maduration_2_3': total_maduration_2_3,
                       'total_maduration_4_5': total_maduration_4_5,
                       'total_discard': total_discard,
                       'total_kg_brute': total_kg_brute,
                       'total_price': total_price,
                       'total_convencional': total_convencional,
                       'total_organic': total_organic,
                       'total_objective_entry': total_objective_entry / count,
                       'total_objective_production': total_objective_production / count,
                       'total_objective_price': total_objective_price,
                       'total_compliance_entry': (float(total_real_entry) / float(
                           total_entry)) * 100 if total_entry > 0 else 0,
                       'total_compliance_production': 100 - (
                               float(total_discard) / float(total_kg_brute)) * 100 if total_kg_brute > 0 else 0}
            if total > 0:
                summary['total_c6'] = total_c6 / total
                summary['total_c8_10_12'] = total_c8_10_12 / total
                summary['total_c14'] = total_c14 / total
                summary['total_maduration_0'] = total_maduration_0 / total
                summary['total_maduration_1'] = total_maduration_1 / total
                summary['total_maduration_2_3'] = total_maduration_2_3 / total
                summary['total_maduration_4_5'] = total_maduration_4_5 / total
                summary['total_objective_price'] = total_objective_price / total
                summary['total_price'] = total_price / total if total_price > 0 else 0
            return Response({'result': serializer.data, 'summary': summary}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListMangoView(APIView):
    def get(self, request):
        queryset = IndicatorKPIMango.objects.all().order_by('-date')
        week = request.query_params.get('week', None)
        year = request.query_params.get('year', None)
        if week:
            queryset = queryset.filter(date__week=week)
        if year:
            queryset = queryset.filter(date__year=year)
        else:
            queryset = queryset.filter(date__year=datetime.now().year)
        if queryset.exists():
            serializer = IndicatorMangoSerializer(queryset, many=True)
            total = queryset.filter(price_objective__gt=0.1).count()
            count = queryset.count()
            total_entry = 0
            total_real_entry = 0
            total_wt_280 = 0
            total_wt_280_300 = 0
            total_wt_300 = 0
            total_color_1 = 0
            total_color_1_5_2_5 = 0
            total_color_3 = 0
            total_mechanical_damage = 0
            total_physical_damage = 0
            total_plagues = 0
            total_others = 0
            total_defects = 0
            total_discard = 0
            total_kg_brute = 0
            total_price = 0
            total_kent = 0
            total_edward = 0
            total_haden = 0
            total_other = 0
            total_objective_entry = 0
            total_objective_production = 0
            total_objective_price = 0
            for data in queryset:
                if data.lots is not None and data.lots.count() > 0:
                    total_wt_280 += data.get_info()['wt_280']
                    total_wt_280_300 += data.get_info()['wt_280_300']
                    total_wt_300 += data.get_info()['wt_300']
                    total_color_1 += data.get_info()['color_1']
                    total_color_1_5_2_5 += data.get_info()['color_1_5_2_5']
                    total_color_3 += data.get_info()['color_3']
                    total_mechanical_damage += data.get_info()['mechanical_damage']
                    total_physical_damage += data.get_info()['physical_damage']
                    total_plagues += data.get_info()['plagues']
                    total_others += data.get_info()['others']
                    total_defects += data.get_info()['total']
                    total_price += float(data.get_price())
                    total_kent += data.get_variety()['kent']
                    total_edward += data.get_variety()['edward']
                    total_haden += data.get_variety()['haden']
                    total_other += data.get_variety()['others']
                total_entry += data.entry if data.entry else 0
                total_real_entry += data.get_entry_real()
                total_objective_entry += data.entry_objective
                total_objective_production += data.objective
                total_objective_price += data.price_objective
                total_discard += data.discard if data.discard else 0
                total_kg_brute += data.kg_brute if data.kg_brute else 0
            summary = {'total_entry': total_entry,
                       'total_real_entry': total_real_entry,
                       'total_wt_280': total_wt_280,
                       'total_wt_280_300': total_wt_280_300,
                       'total_wt_300': total_wt_300,
                       'total_color_1': total_color_1,
                       'total_color_1_5_2_5': total_color_1_5_2_5,
                       'total_color_3': total_color_3,
                       'total_mechanical_damage': total_mechanical_damage,
                       'total_physical_damage': total_physical_damage,
                       'total_plagues': total_plagues,
                       'total_others': total_others,
                       'total_defects': total_defects,
                       'total_discard': total_discard,
                       'total_kg_brute': total_kg_brute,
                       'total_price': total_price,
                       'total_kent': total_kent,
                       'total_edward': total_edward,
                       'total_haden': total_haden,
                       'total_other': total_other,
                       'total_objective_entry': total_objective_entry / count,
                       'total_objective_production': total_objective_production / count,
                       'total_objective_price': total_objective_price,
                       'total_compliance_entry': (float(total_real_entry) / float(
                           total_entry)) * 100 if total_entry > 0 else 0,
                       'total_compliance_production': 100 - (
                               float(total_discard) / float(total_kg_brute)) * 100 if total_kg_brute > 0 else 0}
            if total > 0:
                summary['total_wt_280'] = total_wt_280 / total
                summary['total_wt_280_300'] = total_wt_280_300 / total
                summary['total_wt_300'] = total_wt_300 / total
                summary['total_color_1'] = total_color_1 / total
                summary['total_color_1_5_2_5'] = total_color_1_5_2_5 / total
                summary['total_color_3'] = total_color_3 / total
                summary['total_mechanical_damage'] = total_mechanical_damage / total
                summary['total_physical_damage'] = total_physical_damage / total
                summary['total_plagues'] = total_plagues / total
                summary['total_others'] = total_others / total
                summary['total_defects'] = total_defects / total
                summary['total_price'] = total_price / total
                summary['total_objective_price'] = total_objective_price / total
            return Response({'result': serializer.data, 'summary': summary}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListAguaymantoView(APIView):
    def get(self, request):
        queryset = IndicatorKPIAguaymanto.objects.all().order_by('-date')
        week = request.query_params.get('week', None)
        year = request.query_params.get('year', None)
        if week:
            queryset = queryset.filter(date__week=week)
        if year:
            queryset = queryset.filter(date__year=year)
        else:
            queryset = queryset.filter(date__year=datetime.now().year)
        if queryset.exists():
            serializer = IndicatorAguaymantoSerializer(queryset, many=True)
            total = queryset.filter(price_objective__gt=0.1).count()
            count = queryset.count()
            total_entry = 0
            total_real_entry = 0
            total_maduration_1 = 0
            total_maduration_2 = 0
            total_maduration_3 = 0
            total_mushroom = 0
            total_green = 0
            total_cracked = 0
            total_crushed = 0
            total_caliz = 0
            total_discard = 0
            total_kg_brute = 0
            total_price = 0
            total_objective_entry = 0
            total_objective_production = 0
            total_objective_price = 0
            total_objective_discard = 0

            for data in queryset:
                if data.lots is not None and data.lots.count() > 0:
                    total_maduration_1 += data.get_maduration_defects()['maduration_1']
                    total_maduration_2 += data.get_maduration_defects()['maduration_2']
                    total_maduration_3 += data.get_maduration_defects()['maduration_3']
                    total_mushroom += data.get_maduration_defects()['mushroom']
                    total_green += data.get_maduration_defects()['green']
                    total_cracked += data.get_maduration_defects()['cracked']
                    total_crushed += data.get_maduration_defects()['crushed']
                    total_price += float(data.get_price()) if data.get_price() else 0
                total_entry += data.entry if data.entry else 0
                total_real_entry += data.get_entry_real()
                total_objective_entry += data.entry_objective
                total_objective_production += data.objective
                total_objective_price += data.price_objective
                total_objective_discard += data.discard_objective
                total_discard += data.discard if data.discard else 0
                total_caliz += data.caliz if data.caliz else 0
                total_kg_brute += data.kg_brute if data.kg_brute else 0
            summary = {'total_entry': total_entry,
                       'total_real_entry': total_real_entry,
                       'total_maduration_1': total_maduration_1,
                       'total_maduration_2': total_maduration_2,
                       'total_maduration_3': total_maduration_3,
                       'total_mushroom': total_mushroom,
                       'total_green': total_green,
                       'total_cracked': total_cracked,
                       'total_crushed': total_crushed,
                       'total_caliz': total_caliz,
                       'total_discard': total_discard,
                       'total_kg_brute': total_kg_brute,
                       'total_price': total_price,
                       'total_objective_entry': total_objective_entry / count,
                       'total_objective_production': total_objective_production / count,
                       'total_objective_price': total_objective_price,
                       'total_objective_discard': total_objective_discard / count,
                       'total_compliance_entry': (float(total_real_entry) / float(
                           total_entry)) * 100 if total_entry > 0 else 0,
                       'total_compliance_production': 100 - (
                               float(total_caliz) / float(total_kg_brute)) * 100 if total_kg_brute > 0 else 0,
                       'total_discard_percentage': (float(total_discard) / float(
                           total_kg_brute)) * 100 if total_kg_brute > 0 else 0}

            if total > 0:
                summary['total_maduration_1'] = total_maduration_1 / total
                summary['total_maduration_2'] = total_maduration_2 / total
                summary['total_maduration_3'] = total_maduration_3 / total
                summary['total_mushroom'] = total_mushroom / total
                summary['total_green'] = total_green / total
                summary['total_cracked'] = total_cracked / total
                summary['total_crushed'] = total_crushed / total
                summary['total_objective_price'] = total_objective_price / total
                summary['total_price'] = total_price / total
            return Response({'result': serializer.data, 'summary': summary}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdatePineappleView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "1":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        if IndicatorKPIPineapple.objects.filter(id=kwargs['id']).exists():
            data = IndicatorKPIPineapple.objects.get(id=kwargs['id'])
            serializer = IndicatorPineappleSerializer(data, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class UpdateAguaymantoView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "1":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        if IndicatorKPIAguaymanto.objects.filter(id=kwargs['id']).exists():
            data = IndicatorKPIAguaymanto.objects.get(id=kwargs['id'])
            serializer = IndicatorAguaymantoSerializer(data, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class UpdateMangoView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "1":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        if IndicatorKPIMango.objects.filter(id=kwargs['id']).exists():
            data = IndicatorKPIMango.objects.get(id=kwargs['id'])
            serializer = IndicatorMangoSerializer(data, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListMaintenanceView(APIView):
    def get(self, request):
        queryset = IndicatorMaintenance.objects.all().order_by('-date')
        week = request.query_params.get('week', None)
        year = request.query_params.get('year', None)
        if week:
            queryset = queryset.filter(date__week=week)[:7]

        if year:
            queryset = queryset.filter(date__year=year)
        if queryset.exists():
            count = 0
            for q in queryset:
                if q.kg_executed > 0:
                    count += 1
            serializer = IndicatorMaintenanceSerializer(queryset, many=True)
            total_consumption = queryset.aggregate(Sum('consumption'))['consumption__sum']
            total_kg_terminated = queryset.aggregate(Sum('kg_terminated'))['kg_terminated__sum']
            total_objective_glp = queryset.aggregate(Sum('objective_glp'))['objective_glp__sum']
            total_kg_executed = queryset.aggregate(Sum('kg_executed'))['kg_executed__sum']
            total_ability = queryset.aggregate(Sum('ability'))['ability__sum']
            total_objective_machine = queryset.aggregate(Sum('objective_machine'))['objective_machine__sum']
            total_works_executed = 0
            total_works_scheduled = queryset.aggregate(Sum('works_scheduled'))['works_scheduled__sum']
            total_objective_works = queryset.aggregate(Sum('objective_works'))['objective_works__sum']
            total_work_corrective = queryset.aggregate(Sum('work_corrective'))['work_corrective__sum']
            total_objective_corrective = queryset.aggregate(Sum('objective_corrective'))['objective_corrective__sum']
            total_objective_preventive = queryset.aggregate(Sum('objective_preventive'))['objective_preventive__sum']
            total_work_preventive = queryset.aggregate(Sum('work_preventive'))['work_preventive__sum']
            total_kg_defective = queryset.aggregate(Sum('kg_defective'))['kg_defective__sum']
            total_kg_released = queryset.aggregate(Sum('kg_released'))['kg_released__sum']
            total_objective_pnd = queryset.aggregate(Sum('objective_pnd'))['objective_pnd__sum']

            for data in queryset:
                total_works_executed += data.get_work_executed()
            summary = {
                'total_consumption': total_consumption,
                'total_kg_terminated': total_kg_terminated,
                'total_consumption_real': total_consumption / total_kg_terminated if total_kg_terminated != 0 else 0,
                'total_objective_glp': total_objective_glp,
                'total_kg_executed': total_kg_executed / count if count != 0 else 0,
                'total_ability': total_ability / count if count != 0 else 0,
                'total_efficiency_machine': total_kg_executed / total_ability * 100 if total_ability != 0 else 0,
                'total_objective_machine': total_objective_machine,
                'total_works_executed': total_works_executed,
                'total_works_scheduled': total_works_scheduled,
                'total_compliance_works': total_works_executed / total_works_scheduled * 100 if total_works_scheduled != 0 else 0,
                'total_objective_works': total_objective_works,
                'total_work_corrective': total_work_corrective,
                'total_compliance_corrective': total_work_corrective / total_works_executed * 100 if total_works_executed != 0 else 0,
                'total_objective_corrective': total_objective_corrective,
                'total_objective_preventive': total_objective_preventive,
                'total_compliance_preventive': total_work_preventive / total_works_executed * 100 if total_works_executed != 0 else 0,
                'total_work_preventive': total_work_preventive,
                'total_kg_defective': total_kg_defective,
                'total_kg_released': total_kg_released,
                'total_compliance_pnd': (
                                                1 - total_kg_defective / total_kg_released) * 100 if total_kg_released != 0 else 0,
                'total_objective_pnd': total_objective_pnd,
            }
            return Response({'result': serializer.data, 'summary': summary}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateMaintenanceView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "1" and request.user.role != "10":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        if IndicatorMaintenance.objects.filter(id=kwargs['id']).exists():
            data = IndicatorMaintenance.objects.get(id=kwargs['id'])
            serializer = IndicatorMaintenanceSerializer(data, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)
