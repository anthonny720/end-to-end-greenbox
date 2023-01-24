from django.urls import path

from apps.costs.views import ListCostAPIView, UpdateReportAPIView, UpdateCostsAPIView

app_name = "costs"

urlpatterns = [
    path('get-costs', ListCostAPIView.as_view(), name='costs'),
    path('update-costs', UpdateCostsAPIView.as_view(), name='update-costs-variable'),
    path('update-report/<int:id>', UpdateReportAPIView.as_view(), name='update-costs'),
]
