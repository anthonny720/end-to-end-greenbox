from django.urls import path

from apps.commercial.views import ListProductView, ListFamilyView, ListGroupView, ListTypeView, ListCutView, \
    ListVarietyView, ListClientView, ListPresentationView, ListPackagingView, ListPackingView, ListProviderView, \
    ListConditionView, ListLotView, DetailLotView, ListKardexView, CreateKardexView

app_name = "commercial"
urlpatterns = [path('family', ListFamilyView.as_view()), path('group', ListGroupView.as_view()),
               path('type', ListTypeView.as_view()), path('products', ListProductView.as_view()),
               path('client', ListClientView.as_view()), path('presentation', ListPresentationView.as_view()),
               path('packaging', ListPackagingView.as_view()), path('packing', ListPackingView.as_view()),
               path('provider', ListProviderView.as_view()), path('condition', ListConditionView.as_view()),
               path('lot', ListLotView.as_view()),
               path('lot/<slug>', DetailLotView.as_view()),
               path('kardex', CreateKardexView.as_view()),
               path('kardex/<slug>', ListKardexView.as_view()),
               path('cut/<int:id>', ListCutView.as_view()), path('variety/<int:id>', ListVarietyView.as_view()),
               ]