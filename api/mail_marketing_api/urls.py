
from django.urls import include,path
from rest_framework import routers

from mail_marketing_api import views


router = routers.SimpleRouter()
router.register(r"tasks",views.TaskViewSet, basename="Tasks")
router.register(r"templates",views.TemplateViewSet, basename="Template")
router.register(r"subscribers",views.SubscribersViewSet, basename="Subscribers")

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

