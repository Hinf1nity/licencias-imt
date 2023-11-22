from django.urls import path
from .views import EstadoView

urlpatterns = [
    path('', EstadoView.as_view(), name='estado'),
]