from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.planning.models import IndicatorKPIPineapple, IndicatorKPIMango, IndicatorKPIAguaymanto
from apps.planning.serializers import IndicatorPineappleSerializer, IndicatorMangoSerializer, \
    IndicatorAguaymantoSerializer


# Create your views here.

class ListPineappleView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        queryset = IndicatorKPIPineapple.objects.all().order_by('-date')
        week = request.query_params.get('week', None)
        year = request.query_params.get('year', None)

        if year:
            queryset = queryset.filter(date__year=year)
        if week:
            queryset = queryset.filter(date__week=week)[:7]
        if queryset.exists():
            serializer = IndicatorPineappleSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListMangoView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        queryset = IndicatorKPIMango.objects.all().order_by('-date')
        week = request.query_params.get('week', None)
        year = request.query_params.get('year', None)
        if year:
            queryset = queryset.filter(date__year=year)
        if week:
            queryset = queryset.filter(date__week=week)[:7]
        if queryset.exists():
            serializer = IndicatorMangoSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListAguaymantoView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        queryset = IndicatorKPIAguaymanto.objects.all().order_by('-date')
        week = request.query_params.get('week', None)
        year = request.query_params.get('year', None)
        if year:
            queryset = queryset.filter(date__year=year)
        if week:
            queryset = queryset.filter(date__week=week)[:7]
        if queryset.exists():
            serializer = IndicatorAguaymantoSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
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
