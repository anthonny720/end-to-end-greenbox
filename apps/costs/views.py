from rest_framework.viewsets import ModelViewSet

from apps.costs.models import Report
from apps.costs.serializers import CostSerializer


# Create your views here.

class CostView(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Report.objects.all()
    serializer_class = CostSerializer
