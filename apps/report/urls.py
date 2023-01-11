from django.urls import path

from apps.report.views import ListReportView, \
    ProviderListView, SummaryView, ReportView, ListPTMangoView, ListPTGoldenberryView, ListPTBlueberryView, \
    ListPTBananaView, ListPTPineappleView, UpdatePTMangoView, UpdatePTGoldenberryView, UpdatePTBlueberryView, \
    UpdatePTBananaView, UpdatePTPineappleView

urlpatterns = [
    path('pt/mango', ListPTMangoView.as_view(), name='get-pt-mango'),
    path('pt/goldenberry', ListPTGoldenberryView.as_view(), name='get-pt-goldenberry'),
    path('pt/blueberry', ListPTBlueberryView.as_view(), name='get-pt-blueberry'),
    path('pt/banano', ListPTBananaView.as_view(), name='get-pt-banano'),
    path('pt/pineapple', ListPTPineappleView.as_view(), name='get-pt-pineapple'),
    path('pt/mango/<int:id>', UpdatePTMangoView.as_view(), name='update-pt-mango'),
    path('pt/goldenberry/<int:id>', UpdatePTGoldenberryView.as_view(), name='update-pt-goldenberry'),
    path('pt/blueberry/<int:id>', UpdatePTBlueberryView.as_view(), name='update-pt-blueberry'),
    path('pt/banano/<int:id>', UpdatePTBananaView.as_view(), name='update-pt-banano'),
    path('pt/pineapple/<int:id>', UpdatePTPineappleView.as_view(), name='update-pt-pineapple'),
    path('<int:id>', ReportView.as_view(), name='update-report'),
    path('<category>', ListReportView.as_view(), name='get-report'),
    path('summary/<category>', SummaryView.as_view(), name='get-summary-category'),
    path('providers/<category>', ProviderListView.as_view(), name='get-providers-category'),
]
