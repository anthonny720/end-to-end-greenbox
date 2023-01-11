import random
from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework import status
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
        queryset = ReportPTMango.objects.all().filter(date_process__year=current_date.year)
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            serializers = ReportPTMangoSerializer(queryset, many=True)
            return Response({'result': serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTPineappleView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTPineapple.objects.all().filter(date_process__year=current_date.year)
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            serializers = ReportPTPineappleSerializer(queryset, many=True)
            return Response({'result': serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTBananaView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTBanana.objects.all().filter(date_process__year=current_date.year)
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            serializers = ReportPTBananaSerializer(queryset, many=True)
            return Response({'result': serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTGoldenberryView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTGoldenberry.objects.all().filter(date_process__year=current_date.year)
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            serializers = ReportPTGoldenberrySerializer(queryset, many=True)
            return Response({'result': serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListPTBlueberryView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ReportPTBlueberry.objects.all().filter(date_process__year=current_date.year)
        # FILTERS
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)

        if year:
            queryset = queryset.filter(date_process__year=year)
        if month:
            queryset = queryset.filter(date_process__month=month)
        try:
            serializers = ReportPTBlueberrySerializer(queryset, many=True)
            return Response({'result': serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdatePTBlueberryView(APIView):
    def patch(self,request,*args,**kwargs):
        try:
            pk = kwargs['id']
            queryset = ReportPTBlueberry.objects.get(pk=pk)
            serializer = ReportPTBlueberryUpdateSerializer(queryset,data=request.data,partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message':'Registro actualizado correctamente'},status=status.HTTP_200_OK)
        except:
            return Response({'error':'No se pudo actualizar el registro'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdatePTGoldenberryView(APIView):
    def patch(self,request,*args,**kwargs):
        try:
            pk = kwargs['id']
            queryset = ReportPTGoldenberry.objects.get(pk=pk)
            serializer = ReportPTGoldenberryUpdateSerializer(queryset,data=request.data,partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message':'Registro actualizado correctamente'},status=status.HTTP_200_OK)
        except:
            return Response({'error':'No se pudo actualizar el registro'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdatePTPineappleView(APIView):
    def patch(self,request,*args,**kwargs):
        try:
            pk = kwargs['id']
            queryset = ReportPTPineapple.objects.get(pk=pk)
            serializer = ReportPTPineappleUpdateSerializer(queryset,data=request.data,partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message':'Registro actualizado correctamente'},status=status.HTTP_200_OK)
        except:
            return Response({'error':'No se pudo actualizar el registro'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdatePTMangoView(APIView):
    def patch(self,request,*args,**kwargs):
        try:
            pk = kwargs['id']
            queryset = ReportPTMango.objects.get(pk=pk)
            serializer = ReportPTMangoUpdateSerializer(queryset,data=request.data,partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message':'Registro actualizado correctamente'},status=status.HTTP_200_OK)
        except:
            return Response({'error':'No se pudo actualizar el registro'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdatePTBananaView(APIView):
    def patch(self,request,*args,**kwargs):
        try:
            pk = kwargs['id']
            queryset = ReportPTBanana.objects.get(pk=pk)
            serializer = ReportPTBananaUpdateSerializer(queryset,data=request.data,partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message':'Registro actualizado correctamente'},status=status.HTTP_200_OK)
        except:
            return Response({'error':'No se pudo actualizar el registro'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)