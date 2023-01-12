from django.urls import path

from apps.traceability.views import TraceabilityMango

urlpatterns = [
    path('mango/<lot>', TraceabilityMango.as_view(), name='get-traceability-mango'),
]
