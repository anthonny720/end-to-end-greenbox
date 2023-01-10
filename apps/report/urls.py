from django.urls import path

from apps.report.views import ListReportView, \
    ProviderListView, SummaryView, ReportView, ListPTMangoView, ListPTGoldenberryView, ListPTBlueberryView, \
    ListPTBananaView, ListPTPineappleView

urlpatterns = [
    path('pt/mango', ListPTMangoView.as_view(), name='get-pt-mango'),
    path('pt/goldenberry', ListPTGoldenberryView.as_view(), name='get-pt-goldenberry'),
    path('pt/blueberry', ListPTBlueberryView.as_view(), name='get-pt-blueberry'),
    path('pt/banano', ListPTBananaView.as_view(), name='get-pt-banano'),
    path('pt/pineapple', ListPTPineappleView.as_view(), name='get-pt-pineapple'),
    path('<int:id>', ReportView.as_view(), name='update-report'),
    path('<category>', ListReportView.as_view(), name='get-report'),
    path('summary/<category>', SummaryView.as_view(), name='get-summary-category'),

]
