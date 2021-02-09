from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views

routers = DefaultRouter()
routers.register("orgs", views.OrganizationViewSet)

urlpatterns = [path("", include(routers.urls))]
