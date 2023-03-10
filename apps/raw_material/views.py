from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.costs.models import ReportCost
from apps.planning.models import IndicatorKPIPineapple, IndicatorKPIMango, IndicatorKPIAguaymanto
from apps.quality.models import AnalysisPineapple, CutTest, AnalysisBanano, AnalysisMango, AnalysisAguaymanto, \
    AnalysisBlueberry
from apps.raw_material.models import Lot, ILot
from apps.raw_material.serializers import LotListSerializer, LotSerializer, LotDetailSerializer, ILotSerializer, \
    ILotCRUDSerializer
from apps.report.models import Report, ReportPTPineapple, ReportPTBanana, ReportPTGoldenberry, ReportPTBlueberry, \
    ReportPTMango
from apps.util.pagination import SetPagination


# Create your views here.
class ListCreateLotView(APIView):

    def get(self, request, format=None):
        try:
            ReportCost.objects.get_or_create(date=datetime.now())
        except Exception as e:
            pass
        try:
            IndicatorKPIPineapple.objects.get_or_create(date=datetime.now())
            IndicatorKPIMango.objects.get_or_create(date=datetime.now())
            IndicatorKPIAguaymanto.objects.get_or_create(date=datetime.now())
        except:
            pass
        queryset = Lot.objects.all()
        lot = request.query_params.get('lot', None)
        category = request.query_params.get('category', None)
        variety = request.query_params.get('variety', None)
        condition = request.query_params.get('condition', None)
        guide = request.query_params.get('guide', None)
        if lot:
            queryset = queryset.filter(lot__icontains=lot)
        if category:
            queryset = queryset.filter(category__name__icontains=category)
        if variety:
            queryset = queryset.filter(variety__icontains=variety)
        if condition:
            queryset = queryset.filter(condition__icontains=condition)
        if guide:
            queryset = queryset.filter(providerGuide__icontains=guide)
        if queryset.exists():
            paginator = SetPagination()
            results = paginator.paginate_queryset(queryset, request)
            serializer = LotListSerializer(results, many=True)
            return paginator.get_paginated_response({'result': serializer.data})
        else:
            return Response({'error': 'No se encontraron registro de lotes'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None):
        if request.user.role != "6":
            return Response({'error': 'No tiene permisos para realizar esta acci??n'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            serializer = LotSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            lot = get_object_or_404(Lot, lot=serializer.data['lot'])
            if lot.category.name == "Pi??a":
                ReportPTPineapple.objects.get_or_create(lot=lot, date_process=datetime.now())
                AnalysisPineapple.objects.create(lot=lot)
                CutTest.objects.create(lot=lot)
                try:
                    i, created = IndicatorKPIPineapple.objects.get_or_create(date=lot.entryDate)
                    i.price_objective = 1.66
                    i.lots.add(lot)
                    i.save()
                except:
                    pass
            elif lot.category.name == "Banano":
                ReportPTBanana.objects.get_or_create(lot=lot, date_process=datetime.now())
                AnalysisBanano.objects.create(lot=lot)
            elif lot.category.name == "Mango":
                ReportPTMango.objects.get_or_create(lot=lot, date_process=datetime.now())

                AnalysisMango.objects.create(lot=lot)
                try:
                    i, created = IndicatorKPIMango.objects.get_or_create(date=lot.entryDate)
                    i.price_objective = 2.66
                    i.lots.add(lot)
                    i.save()
                except:
                    pass
            elif lot.category.name == "Aguaymanto":
                ReportPTGoldenberry.objects.get_or_create(lot=lot, date_process=datetime.now())
                AnalysisAguaymanto.objects.create(lot=lot)
                try:
                    i, created = IndicatorKPIAguaymanto.objects.get_or_create(date=lot.entryDate)
                    i.price_objective = 2.60
                    i.lots.add(lot)
                    i.save()
                except Exception as e:
                    pass
            elif lot.category.name == "Fresa":
                pass
            else:
                ReportPTBlueberry.objects.get_or_create(lot=lot, date_process=datetime.now())
                AnalysisBlueberry.objects.create(lot=lot)
            Report.objects.create(lot=lot)
            return Response({'message': 'Lote registrado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurri?? un error al registrar el lote', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailEntryView(APIView):

    def get(self, request, *args, **kwargs):
        lot = get_object_or_404(Lot, lot=kwargs['lot'])
        serializer = LotDetailSerializer(lot)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        entry = get_object_or_404(Lot, lot=kwargs['lot'])
        # if request.user.role != "6":
        #     return Response({'error': 'No tiene permisos para realizar esta acci??n'},
        #                     status=status.HTTP_401_UNAUTHORIZED)
        try:
            serializer = LotSerializer(entry, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Lote actualizado correctamente"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Ocurri?? un error al actualizar el lote"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, *args, **kwargs):
        entry = get_object_or_404(Lot, lot=kwargs['lot'])
        if not request.user.is_superuser:
            return Response({'error': 'No tiene permisos para realizar esta acci??n'},
                            status=status.HTTP_401_UNAUTHORIZED)
        if entry.closed:
            return Response({"error": "El lote ya esta bloqueado para su edici??n. Cont??ctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            entry.delete()
            return Response({"message": "Lote eliminado correctamente"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Ocurri?? un error al eliminar el lote"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListILotView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = kwargs['lot']
            serializer = ILotSerializer(ILot.objects.filter(lot__lot=lot), many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateInformationView(APIView):
    def post(self, request, format=None):
        if request.user.role != "6":
            return Response({'error': 'No tiene permisos para realizar esta acci??n'},
                            status=status.HTTP_401_UNAUTHORIZED)
        data = request.data
        try:
            if Lot.objects.get(id=data.get("lot")).closed:
                return Response({"error": "El lote ya esta bloqueado para su edici??n. Cont??ctese con el administrador"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return Response({"error": "Ocurri?? un problema interno. Cont??ctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            serializer = ILotCRUDSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Item agregado correctamente'}, status=status.HTTP_201_CREATED)
        except:
            return Response({"error": "Ocurri?? un error al registrar la informaci??n, verifique los datos"},
                            status=status.HTTP_400_BAD_REQUEST)


class DetailInformationView(APIView):
    def patch(self, request, *args, **kwargs):
        inf = get_object_or_404(ILot, id=kwargs['id'])
        if inf.lot.closed:
            return Response({"error": "El lote ya esta bloqueado para su edici??n. Cont??ctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if request.user.role != "6":
            return Response({'error': 'No tiene permisos para realizar esta acci??n'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            if not request.data.get("indicted"):
                request.data["indicted"] = False
                request.data["dateIndicted"] = None
            else:
                request.data["indicted"] = True
            serializer = ILotCRUDSerializer(inf, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Item actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": 'Ocurri?? un error al actualizar el item', 'detail': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        inf = get_object_or_404(ILot, id=kwargs['id'])
        if inf.lot.closed:
            return Response({"error": "El lote ya esta bloqueado para su edici??n. Cont??ctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if not request.user.is_superuser:
            return Response({'error': 'No tiene permisos para realizar esta acci??n'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            inf.delete()
            return Response({"message": "Item eliminado correctamente"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Ocurri?? un error al eliminar el registro"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListLotProductionView(APIView):
    def get(self, request, format=None):
        if Lot.objects.all().exists():
            serializer = LotListSerializer(Lot.objects.all()[:15], many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registro de lotes'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
