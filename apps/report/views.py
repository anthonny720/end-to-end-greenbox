import random
from datetime import datetime

from django.db.models import Sum
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.products.models import Fruits
from apps.report.models import Report, ReportPTMango, ReportPTPineapple, ReportPTBanana, ReportPTGoldenberry, \
    ReportPTBlueberry
from apps.report.serializers import ReportSerializer, ReportPTMangoSerializer, ReportPTPineappleSerializer, \
    ReportPTBananaSerializer, ReportPTGoldenberrySerializer, ReportPTBlueberrySerializer, \
    ReportPTBlueberryUpdateSerializer, ReportPTGoldenberryUpdateSerializer, ReportPTPineappleUpdateSerializer, \
    ReportPTMangoUpdateSerializer, ReportPTBananaUpdateSerializer
from apps.util.pagination import SetPagination


def generate_color(transparency=1):
    rand_color = (random.randrange(255), random.randrange(255), random.randrange(255))
    color = "rgba({}, {}, {}, {})".format(rand_color[0], rand_color[1], rand_color[2], transparency)
    color_full = "rgba({}, {}, {}, {})".format(rand_color[0], rand_color[1], rand_color[2], 1)
    return color, color_full


# Create your views here.
class ListDataReportExcelView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        category = kwargs["category"].capitalize()
        current_date = datetime.date(datetime.now())
        queryset = Report.objects.all().filter(lot__category__name=category)

        # FILTERS
        year = request.query_params.get('year', current_date.year)
        if year:
            queryset = queryset.filter(lot__entryDate__year=year)
        try:
            serializers = ReportSerializer(queryset, many=True)
            return Response({'result': serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListReportView(APIView):
    def get(self, request, *args, **kwargs):
        category = kwargs["category"].capitalize()
        current_date = datetime.date(datetime.now())
        queryset = Report.objects.all().filter(lot__category__name=category)

        # FILTERS
        provider = request.query_params.get('provider', None)
        year = request.query_params.get('year', current_date.year)
        month = request.query_params.get('month', None)

        if provider:
            queryset = queryset.filter(lot__provider__name__icontains=provider)
        if month:
            queryset = queryset.filter(lot__entryDate__month=month)
        if year:
            queryset = queryset.filter(lot__entryDate__year=year)
        try:
            report = []
            kg = 0
            total = 0
            price = 0
            for c in queryset:
                kg += c.get_kg_usable()
                total += c.get_total_amount()
                try:
                    price = float(total) / float(kg)
                except Exception as e:
                    print(e)
            report.append({'kg': kg, 'price': price, 'total': total})
            paginator = SetPagination()
            results = paginator.paginate_queryset(queryset, request)
            serializers = ReportSerializer(results, many=True)
            return paginator.get_paginated_response({'result': serializers.data, 'report': report})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


class ReportView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "1" and request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        report = get_object_or_404(Report, id=kwargs["id"])
        try:
            serializer = ReportSerializer(report, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro actualizado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "Ocurrió un error al actualizar el registro", 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SummaryView(APIView):
    def get(self, request, *args, **kwargs):
        category = kwargs["category"].capitalize()
        try:
            current_date = datetime.date(datetime.now())
            query = Report.objects.filter(lot__category__name__icontains=category,
                                          lot__entryDate__year=current_date.year)
            orders_by_providers = []
            providers = []
            orders_by_month = []
            kg_by_month = []
            providers_by_month = []
            providers_by_kg = []
            summary_avg_price = []
            try:
                for month in months:
                    total = 0
                    data = []
                    for c in query.filter(lot__entryDate__month=months.index(month) + 1):
                        total += c.get_total_amount()
                    data.append(total)
                    orders_by_month.append({'label': month, 'data': data, 'backgroundColor': generate_color()})
            except:
                pass

            try:
                for month in months:
                    total = 0
                    data = []
                    for c in query.filter(lot__entryDate__month=months.index(month) + 1):
                        total += c.get_kg_usable()
                    data.append(total)
                    kg_by_month.append({'label': month, 'data': data, 'backgroundColor': generate_color()})
            except:
                pass

            # GET ALL PROVIDERS
            try:
                for p in Fruits.objects.get(name__icontains=category).provider.all():
                    providers.append(p.name)
            except:
                pass

            # TOTAL AMOUNT FOR PROVIDERS
            try:
                for provider in providers:
                    kg = 0
                    total = 0
                    data = []
                    for c in query.filter(lot__provider__name__icontains=provider):
                        total += c.get_total_amount()
                    data.append(total)
                    orders_by_providers.append({'label': provider, 'data': data, 'backgroundColor': generate_color()})
            except:
                pass

            # SUMMARY PROVIDER FOR MONTHS AND PROVIDERS FOR KG
            try:
                for provider in providers:
                    data = []
                    data_2 = []
                    data_3 = []
                    for month in months:
                        total = 0
                        kg = 0
                        avg = 0
                        for c in query.filter(lot__entryDate__month=months.index(month) + 1,
                                              lot__provider__name__icontains=provider):
                            total += c.get_total_amount()
                            kg += c.get_kg_usable()
                        try:
                            avg = round(total / kg, 2)
                        except:
                            avg = 0
                        data.append(total)
                        data_2.append(kg)
                        data_3.append(avg)
                    providers_by_month.append({'label': provider, 'data': data, 'backgroundColor': generate_color()})
                    providers_by_kg.append({'label': provider, 'data': data_2, 'backgroundColor': generate_color()})
                    color, color_full = generate_color(0.3)
                    summary_avg_price.append(
                        {'label': provider, 'data': data_3, 'backgroundColor': color, 'fill': True,
                         'borderColor': color_full})
            except:
                pass
            return Response({'orders_by_month': orders_by_month, 'orders_by_provider': orders_by_providers,
                             'providers_by_month': providers_by_month, 'providers_by_kg': providers_by_kg,
                             'kg_by_month': kg_by_month
                                , 'summary_avg_price': summary_avg_price},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProviderListView(APIView):
    def get(self, request, **kwargs):
        category = kwargs["category"].capitalize()
        providers = []
        try:
            for p in Fruits.objects.get(name__icontains=category).provider.all():
                providers.append(p.name)
            return Response({'providers': providers}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'No se encontraron resultados', 'detail': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)


class ListPTMangoView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTMango.objects.all()
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        if not year:
            queryset = queryset.filter(date_process__year=current_date.year)
        try:
            retail_slices = queryset.aggregate(Sum('retail_slices'))['retail_slices__sum']
            retail_cachetes = queryset.aggregate(Sum('retail_cachetes'))['retail_cachetes__sum']
            retail_chunks = queryset.aggregate(Sum('retail_chunks'))['retail_chunks__sum']
            retail_cubs = queryset.aggregate(Sum('retail_cubs'))['retail_cubs__sum']
            granel_slices = queryset.aggregate(Sum('granel_slices'))['granel_slices__sum']
            granel_cachetes = queryset.aggregate(Sum('granel_cachetes'))['granel_cachetes__sum']
            granel_chunks = queryset.aggregate(Sum('granel_chunks'))['granel_chunks__sum']
            granel_cubs = queryset.aggregate(Sum('granel_cubs'))['granel_cubs__sum']
            recoverable = queryset.aggregate(Sum('recoverable'))['recoverable__sum']
            retail = {'slices': retail_slices, 'cachetes': retail_cachetes, 'chunks': retail_chunks,
                      'cubs': retail_cubs}
            granel = {'slices': granel_slices, 'cachetes': granel_cachetes, 'chunks': granel_chunks,
                      'cubs': granel_cubs}
            recoverable = {'recuperable': recoverable}
            serializers = ReportPTMangoSerializer(queryset, many=True)
            return Response({'result': serializers.data,
                             'summary': {'retail': retail, 'granel': granel, 'recoverable': recoverable}},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTPineappleView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTPineapple.objects.all()
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if not year:
            queryset = queryset.filter(date_process__year=current_date.year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            retail_rings = queryset.aggregate(Sum('retail_rings'))['retail_rings__sum']
            retail_1_8 = queryset.aggregate(Sum('retail_1_8'))['retail_1_8__sum']
            retail_1_16 = queryset.aggregate(Sum('retail_1_16'))['retail_1_16__sum']
            granel_rings = queryset.aggregate(Sum('granel_rings'))['granel_rings__sum']
            granel_1_16 = queryset.aggregate(Sum('granel_1_16'))['granel_1_16__sum']
            granel_1_8 = queryset.aggregate(Sum('granel_1_8'))['granel_1_8__sum']
            retail = {'rings': retail_rings, '1/8': retail_1_8, '1/16': retail_1_16}
            granel = {'rings': granel_rings, '1/8': granel_1_8, '1/16': granel_1_16}
            serializers = ReportPTPineappleSerializer(queryset, many=True)
            return Response({'result': serializers.data, 'summary': {'retail': retail, 'granel': granel}},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTBananaView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTBanana.objects.all()
        # FILTERS
        year = request.query_params.get('year', None)

        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if not year:
            queryset = queryset.filter(date_process__year=current_date.year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            retail_slices = queryset.aggregate(Sum('retail_slices'))['retail_slices__sum']
            retail_coins = queryset.aggregate(Sum('retail_coins'))['retail_coins__sum']
            granel_slices = queryset.aggregate(Sum('granel_slices'))['granel_slices__sum']
            granel_coins = queryset.aggregate(Sum('granel_coins'))['granel_coins__sum']
            retail = {'slices': retail_slices, 'coins': retail_coins}
            granel = {'slices': granel_slices, 'coins': granel_coins}
            serializers = ReportPTBananaSerializer(queryset, many=True)
            return Response({'result': serializers.data, 'summary': {'retail': retail, 'granel': granel}},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTGoldenberryView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTGoldenberry.objects.all()
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if not year:
            queryset = queryset.filter(date_process__year=current_date.year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            retail_whole = queryset.aggregate(Sum('retail_whole'))['retail_whole__sum']
            retail_halves = queryset.aggregate(Sum('retail_halves'))['retail_halves__sum']
            retail_quarter = queryset.aggregate(Sum('retail_quarter'))['retail_quarter__sum']
            granel_whole = queryset.aggregate(Sum('granel_whole'))['granel_whole__sum']
            granel_halves = queryset.aggregate(Sum('granel_halves'))['granel_halves__sum']
            granel_quarter = queryset.aggregate(Sum('granel_quarter'))['granel_quarter__sum']
            retail = {'whole': retail_whole, 'halves': retail_halves, 'quarter': retail_quarter}
            granel = {'whole': granel_whole, 'halves': granel_halves, 'quarter': granel_quarter}
            serializers = ReportPTGoldenberrySerializer(queryset, many=True)
            return Response({'result': serializers.data, 'summary': {'retail': retail, 'granel': granel}},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTBlueberryView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTBlueberry.objects.all().order_by('date_process')
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if not year:
            queryset = queryset.filter(date_process__year=current_date.year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            retail_whole = queryset.aggregate(Sum('retail_whole'))['retail_whole__sum']
            retail_halves = queryset.aggregate(Sum('retail_halves'))['retail_halves__sum']
            granel_whole = queryset.aggregate(Sum('granel_whole'))['granel_whole__sum']
            granel_halves = queryset.aggregate(Sum('granel_halves'))['granel_halves__sum']
            retail = {'whole': retail_whole, 'halves': retail_halves}
            granel = {'whole': granel_whole, 'halves': granel_halves}
            serializers = ReportPTBlueberrySerializer(queryset, many=True)
            return Response({'result': serializers.data, 'summary': {'retail': retail, 'granel': granel}},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdatePTBlueberryView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "7":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            pk = kwargs['id']
            queryset = ReportPTBlueberry.objects.get(pk=pk)
            serializer = ReportPTBlueberryUpdateSerializer(queryset, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se pudo actualizar el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdatePTGoldenberryView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "7":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            pk = kwargs['id']
            queryset = ReportPTGoldenberry.objects.get(pk=pk)
            serializer = ReportPTGoldenberryUpdateSerializer(queryset, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se pudo actualizar el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdatePTPineappleView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "7":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            pk = kwargs['id']
            queryset = ReportPTPineapple.objects.get(pk=pk)
            serializer = ReportPTPineappleUpdateSerializer(queryset, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se pudo actualizar el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdatePTMangoView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "7":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            pk = kwargs['id']
            queryset = ReportPTMango.objects.get(pk=pk)
            serializer = ReportPTMangoUpdateSerializer(queryset, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se pudo actualizar el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdatePTBananaView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "7":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            pk = kwargs['id']
            queryset = ReportPTBanana.objects.get(pk=pk)
            serializer = ReportPTBananaUpdateSerializer(queryset, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se pudo actualizar el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
