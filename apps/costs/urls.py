from rest_framework import routers

from apps.costs.views import CostView

app_name = "costs"

router = routers.SimpleRouter()
router.register(r'report', CostView)
urlpatterns = router.urls