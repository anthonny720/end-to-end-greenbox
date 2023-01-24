from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.costs.models import ReportCost, ReportCategory
from apps.costs.serializers import CostSerializer
from apps.products.models import Fruits


# Create your views here.

class ListCostAPIView(APIView):
    def get(self, request):
        startDate = request.query_params.get('startDate', None)
        endDate = request.query_params.get('endDate', None)
        queryset = ReportCost.objects.all()
        if startDate and endDate:
            queryset = queryset.filter(date__range=[startDate, endDate])
        try:
            serializer = CostSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se encontraron registros','detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateReportAPIView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "7":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = kwargs['id']
            data = request.data
            report = get_object_or_404(ReportCost, id=id)
            category = get_object_or_404(Fruits, id=data['category'])
            report.category = category
            report.kg_processed = data['kg_processed']
            report.kg_total = data['kg_total']
            report.save()
            return Response({'message': 'Se actualizo correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateCostsAPIView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "4":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            data = request.data
            for d in data:
                report = get_object_or_404(ReportCategory, id=data[d]['id'])
                report.cost = data[d]['cost']
                report.save()
            return Response({'message': 'Se actualizo correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
