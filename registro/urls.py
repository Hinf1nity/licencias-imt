from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('registro/', views.form_regis),
]