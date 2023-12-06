from django.urls import path
from .views import CustomLogoutView

urlpatterns = [
    path('', CustomLogoutView.as_view(), name='logout'),
    
]

