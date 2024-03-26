from django.urls import path, include 
from django.contrib.auth.views import LoginView
#from .views import ConsultaPermisosDocentesView
from .views import PermisosView

urlpatterns = [
    path('', PermisosView.as_view(), name='consulta_permisos_docentes'),
]
