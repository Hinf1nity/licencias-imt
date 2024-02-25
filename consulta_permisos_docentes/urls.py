from django.urls import path
from .views import PermisosView

urlpatterns = [
    path('', PermisosView.as_view(), name='permiso_docente'),
]
