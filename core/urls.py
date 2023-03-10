from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from core import settings

urlpatterns = [path('admin/', admin.site.urls),

               path('api/products/', include('apps.products.urls')),
               path('api/management/', include('apps.management.urls')),
               path('api/business-partners/', include('apps.business_partners.urls')),
               path('api/raw-material/', include('apps.raw_material.urls')),
               path('api/quality/', include('apps.quality.urls')),
               path('api/process-line/', include('apps.process_line.urls')),
               path('api/report/', include('apps.report.urls')),

               path('api/users/', include('apps.users.urls')),

               path('api/logistic/', include('apps.warehouse.urls')),
               path('api/commercial/', include('apps.commercial.urls')),
               path('api/planning/', include('apps.planning.urls')),
               path('api/traceability/', include('apps.traceability.urls')),
               path('api/costs/', include('apps.costs.urls')),

               path('auth/', include('djoser.urls')), path('auth/', include('djoser.urls.jwt')), ]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
