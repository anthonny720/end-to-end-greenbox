from django.urls import path

from apps.traceability.views import Traceability

urlpatterns = [
    path('<lot>', Traceability.as_view(), name='get-traceability'),
]
