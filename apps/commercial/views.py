from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.business_partners.models import BusinessMaquila, Client
from apps.business_partners.serializers import ProviderMaquilaDetailSerializer
from apps.commercial.models import Product, Condition, Packing, Presentation, Variety, Cut, Type, Group, Family, Lot, \
    KardexCommercial
from apps.commercial.serializers import ProductSerializer, ConditionSerializer, PackingSerializer, \
    PresentationSerializer, ClientSerializer, VarietySerializer, CutSerializer, TypeSerializer, GroupSerializer, \
    LotSerializer, KardexSerializer
from apps.util.pagination import SetPagination


# Create your views here.

class ListFamilyView(APIView):
    def get(self, request):
        queryset = Family.objects.all()
        client = request.query_params.get('client', None)
        product = request.query_params.get('product', None)
        family = request.query_params.get('family', None)
        group = request.query_params.get('group', None)
        fcl = request.query_params.get('fcl', None)
        cut = request.query_params.get('cut', None)
        type_inf = request.query_params.get('type_inf', None)
        result = []

        try:
            lot = Lot.objects.all()
            for family in queryset:
                stock = 0
                query = lot.filter(product__family__name=family.name)
                if client:
                    if client == "sn":
                        query = query.filter(client__isnull=True)
                    else:
                        query = query.filter(client__id=client)
                if product:
                    query = query.filter(product_id=product)
                if family:
                    query = query.filter(product__family_id=family)
                if group:
                    query = query.filter(group_id=group)
                if fcl:
                    query = query.filter(fcl_id=fcl)
                if type_inf:
                    query = query.filter(type_inf_id=type_inf)
                if cut:
                    query = query.filter(cut_id=cut)
                for l in query:
                    stock += l.get_stock()
                result.append({
                    'id': family.id,
                    'name': family.name,
                    'stock': stock
                })
            return Response({'result': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListGroupView(APIView):
    def get(self, request):
        if Group.objects.exists():
            groups = Group.objects.all()
            serializer = GroupSerializer(groups, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListTypeView(APIView):
    def get(self, request):
        if Type.objects.exists():
            types = Type.objects.all()
            serializer = TypeSerializer(types, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListProductView(APIView):
    def get(self, request):
        if Product.objects.exists():
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListCutView(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs['id']
        if Cut.objects.filter(product__id=id).exists():
            cuts = Cut.objects.filter(product__id=id)
            serializer = CutSerializer(cuts, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListVarietyView(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs['id']
        if Variety.objects.filter(product__id=id).exists():
            varieties = Variety.objects.filter(product__id=id)
            serializer = VarietySerializer(varieties, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListClientView(APIView):
    def get(self, request):
        if Client.objects.exists():
            clients = Client.objects.all()
            serializer = ClientSerializer(clients, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListPresentationView(APIView):
    def get(self, request):
        if Presentation.objects.exists():
            presentations = Presentation.objects.all()
            serializer = PresentationSerializer(presentations, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListPackagingView(APIView):
    def get(self, request):
        if Packing.objects.filter(category=1).exists():
            packaging = Packing.objects.filter(category=1)
            serializer = PackingSerializer(packaging, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListPackingView(APIView):
    def get(self, request):
        if Packing.objects.filter(category=2).exists():
            packing = Packing.objects.filter(category=2)
            serializer = PackingSerializer(packing, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListProviderView(APIView):
    def get(self, request):
        if BusinessMaquila.objects.filter().exists():
            providers = BusinessMaquila.objects.all()
            serializer = ProviderMaquilaDetailSerializer(providers, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListConditionView(APIView):
    def get(self, request):
        if Condition.objects.exists():
            conditions = Condition.objects.all()
            serializer = ConditionSerializer(conditions, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListLotView(APIView):
    def get(self, request):
        client = request.query_params.get('client', None)
        product = request.query_params.get('product', None)
        family = request.query_params.get('family', None)
        group = request.query_params.get('group', None)
        fcl = request.query_params.get('fcl', None)
        cut = request.query_params.get('cut', None)
        type_inf = request.query_params.get('type_inf', None)
        queryset = Lot.objects.all()
        if client:
            if client == 'sn':
                queryset = queryset.filter(client__isnull=True)
            else:
                queryset = queryset.filter(client_id=client)
        if product:
            queryset = queryset.filter(product_id=product)
        if family:
            queryset = queryset.filter(product__family_id=family)
        if group:
            queryset = queryset.filter(group_id=group)
        if fcl:
            queryset = queryset.filter(fcl_id=fcl)
        if type_inf:
            queryset = queryset.filter(type_inf_id=type_inf)
        if cut:
            queryset = queryset.filter(cut_id=cut)
        if queryset.exists():
            paginator = SetPagination()
            results = paginator.paginate_queryset(queryset, request)
            serializer = LotSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            serializer = LotSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro creado correctamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al registrar el item', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailLotView(APIView):
    def get(self, request, slug):
        if Lot.objects.filter(slug=slug).exists():
            lot = Lot.objects.get(slug=slug)
            serializer = LotSerializer(lot)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, slug):
        if request.user.role != "2" and request.user.role != "1" and request.user.role != "5":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        if Lot.objects.filter(slug=slug).exists():
            lot = Lot.objects.get(slug=slug)
            serializer = LotSerializer(lot, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        if Lot.objects.filter(slug=slug).exists():
            lot = Lot.objects.get(slug=slug)
            lot.delete()
            return Response({'message': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListKardexView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            slug = kwargs['slug']
        except:
            return Response({'error': 'El parametro id es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            output = []
            input = []
            q = KardexCommercial.objects.filter(lot__slug=slug)
            for i in q:
                input.append({"id": i.id, "title": f'↑ {i.input} kg', "date": i.date,
                              "backgroundColor": "rgb(60, 179, 113)", "borderColor": "white",
                              "className": "p-2 flex-wrap text-center"})
                output.append({"id": i.id, "title": f'↓ {i.output} kg', "date": i.date,
                               "backgroundColor": "rgb(255,47,0,0.7)", "borderColor": "white",
                               "className": "p-2 flex-wrap text-center"})
            result = input + output
            return Response({'result': result}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateKardexView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            data = request.data
            lot = request.data['lot']
            date = request.data['date']
            if KardexCommercial.objects.filter(lot=lot, date=date).exists():
                kardex = KardexCommercial.objects.filter(lot=lot, date=date)
                kardex.update(**data)
                return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_201_CREATED)
            serializer = KardexSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro creado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al realizar el registro al kardex', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
