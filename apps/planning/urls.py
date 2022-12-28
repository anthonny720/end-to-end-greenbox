from django.urls import path

from apps.planning.views import ListPineappleView, ListMangoView, ListAguaymantoView, UpdatePineappleView, \
    UpdateAguaymantoView, UpdateMangoView, ListMaintenanceView, UpdateMaintenanceView

urlpatterns = [

    path('kpi/pineapple', ListPineappleView.as_view()),
    path('kpi/mango', ListMangoView.as_view()),
    path('kpi/aguaymanto', ListAguaymantoView.as_view()),
    path('kpi/pineapple/<int:id>', UpdatePineappleView.as_view()),
    path('kpi/aguaymanto/<int:id>', UpdateAguaymantoView.as_view()),
    path('kpi/mango/<int:id>', UpdateMangoView.as_view()),
    path('kpi/maintenance', ListMaintenanceView.as_view()),
    path('kpi/maintenance/<int:id>', UpdateMaintenanceView.as_view()),

]
