from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('', views.AdminOnlyView.as_view(), name='petition_list'),
    path('logout/', LogoutView.as_view(), name='logout'),
    #path('update_observation/', views.UpdateObservationView.as_view(), name='update_observation'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)