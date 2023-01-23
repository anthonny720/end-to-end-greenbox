from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.process_line.models import ProcessLineTerminated, ProcessLineConditioning, ProcessLineReleased
from apps.process_line.serializers import ConditioningListSerializer, TerminatedListSerializer, LiberatedListSerializer
from apps.products.models import PackingProduct
from apps.products.serializers import PackingContainersSerializer
from apps.quality.serializers import AnalysisMangoSerializer, AnalysisAguaymantoSerializer, AnalysisBlueberrySerializer, \
    AnalysisBananoSerializer, AnalysisPineappleSerializer
from apps.raw_material.models import Lot
from apps.raw_material.serializers import LotDetailSerializer
from apps.report.models import ReportPTMango, ReportPTPineapple, ReportPTBanana, ReportPTBlueberry, ReportPTGoldenberry
from apps.report.serializers import ReportSerializer, ReportPTMangoSerializer, ReportPTPineappleSerializer, \
    ReportPTBananaSerializer, ReportPTBlueberrySerializer, ReportPTGoldenberrySerializer
from apps.warehouse.models import PackingList
from apps.warehouse.serializers import IPackingListSerializer


# Create your views here.


class Traceability(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = Lot.objects.get(lot=kwargs['lot'])
            category = lot.category.name
            try:
                serializer_acopio = LotDetailSerializer(lot, many=False)
            except:
                serializer_acopio = []
            try:
                serializer_report_mp = ReportSerializer(lot.report, many=False)
            except:
                serializer_report_mp = []
            try:
                if category == 'Mango':
                    lot_pt = ReportPTMango.objects.get(lot=lot)
                    serializer_report_pt = ReportPTMangoSerializer(lot_pt, many=False)
                elif category == 'Piña':
                    lot_pt = ReportPTPineapple.objects.get(lot=lot)
                    serializer_report_pt = ReportPTPineappleSerializer(lot_pt, many=False)
                elif category == 'Banano':
                    lot_pt = ReportPTBanana.objects.get(lot=lot)
                    serializer_report_pt = ReportPTBananaSerializer(lot_pt, many=False)
                elif category == 'Arandanos':
                    lot_pt = ReportPTBlueberry.objects.get(lot=lot)
                    serializer_report_pt = ReportPTBlueberrySerializer(lot_pt, many=False)
                elif category == 'Aguaymanto':
                    lot_pt = ReportPTGoldenberry.objects.get(lot=lot)
                    serializer_report_pt = ReportPTGoldenberrySerializer(lot_pt, many=False)
                else:
                    serializer_report_pt = []
            except:
                serializer_report_pt = []
            try:
                if category == 'Mango':
                    serializer_quality = AnalysisMangoSerializer(lot.analysis_mango, many=False)
                elif category == 'Piña':
                    serializer_quality = AnalysisPineappleSerializer(lot.analysis_pineapple, many=False)
                elif category == 'Banano':
                    serializer_quality = AnalysisBananoSerializer(lot.analysis_banano, many=False)
                elif category == 'Arandanos':
                    serializer_quality = AnalysisBlueberrySerializer(lot.analysis_blueberry, many=False)
                elif category == 'Aguaymanto':
                    serializer_quality = AnalysisAguaymantoSerializer(lot.analysis_aguaymanto, many=False)
                else:
                    serializer_quality = []
            except:
                serializer_quality = []
            try:
                queryset = ProcessLineConditioning.objects.filter(lot=lot)
                serializer_conditioning = ConditioningListSerializer(queryset, many=True)
            except:
                serializer_conditioning = []
            try:
                query = ProcessLineTerminated.objects.filter(process__lot=lot)
                serializer_terminated = TerminatedListSerializer(query, many=True)
            except:
                serializer_terminated = []
            try:
                query = ProcessLineReleased.objects.filter(process__process__lot=lot)
                serializer_released = LiberatedListSerializer(query, many=True)
            except:
                serializer_released = []
            try:
                list = []
                for i in query:
                    try:
                        if i.lot_bags.lot not in list and i.lot_bags.lot not in list:
                            list.append(i.lot_bags.lot)
                            list.append(i.lot_boxes.lot)
                    except Exception as e:
                        pass
                q = PackingProduct.objects.filter(lot__in=list)

                serializer_packing = PackingContainersSerializer(q, many=True)
            except Exception as e:
                serializer_packing = []
            try:
                list = []
                for i in query:
                    for j in i.receptions.all():
                        try:
                            if j.program.id not in list:
                                list.append(j.program.id)
                        except Exception as e:
                            pass
                q = PackingList.objects.filter(id__in=list)

                serializer_comex = IPackingListSerializer(q, many=True)
            except Exception as e:
                serializer_comex = [str(e)]

            return Response({
                'acopio': serializer_acopio.data if serializer_acopio else [],
                'report_mp': serializer_report_mp.data if serializer_report_mp else [],
                'report_pt': serializer_report_pt.data if serializer_report_pt else [],
                'quality': serializer_quality.data if serializer_quality else [],
                'conditioning': serializer_conditioning.data if serializer_conditioning else [],
                'terminated': serializer_terminated.data if serializer_terminated else [],
                'released': serializer_released.data if serializer_released else [],
                'packing': serializer_packing.data if serializer_packing else [],
                'comex': serializer_comex.data if serializer_comex else [],
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
