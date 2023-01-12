from rest_framework import status
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.process_line.serializers import ConditioningListSerializer, TerminatedListSerializer, LiberatedListSerializer
from apps.quality.serializers import AnalysisMangoSerializer
from apps.raw_material.models import Lot
from apps.raw_material.serializers import LotDetailSerializer
from apps.report.serializers import ReportSerializer, ReportPTMangoSerializer


# Create your views here.


class TraceabilityMango(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = Lot.objects.get(lot=kwargs['lot'])
            serializer_acopio = LotDetailSerializer(lot, many=False)
            serializer_report_mp = ReportSerializer(lot.report, many=False)
            serializer_report_pt = ReportPTMangoSerializer(lot.report_pt_mango, many=False)
            serializer_quality = AnalysisMangoSerializer(lot.analysis_mango, many=False)
            serializer_conditioning = ConditioningListSerializer(lot.conditioning, many=True)
            serializer_terminated = TerminatedListSerializer(lot.conditioning.process_line, many=True)
            serializer_released = LiberatedListSerializer(lot.conditioning.process_line.process_line_released,
                                                          many=True)
            return Response({
                'acopio': serializer_acopio.data,
                'report_mp': serializer_report_mp.data,
                'report_pt': serializer_report_pt.data,
                'quality': serializer_quality.data,
                'conditioning': serializer_conditioning.data,
                'terminated': serializer_terminated.data,
                'released': serializer_released.data
            })
        except Exception as e:
            return Response({'error': 'No se encontro el lote'}, status=status.HTTP_400_BAD_REQUEST)
