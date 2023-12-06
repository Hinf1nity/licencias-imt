from django.contrib.auth.views import LogoutView
from django.shortcuts import redirect

class CustomLogoutView(LogoutView):
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        return redirect('/cidimec/licencias-imt/login/')
