from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from registro.models import estudiantes, permisos
from itertools import groupby

class EstadoView(View):
    def get(self, request):
        return render(request, 'carnets.html')

    def post(self, request):
        try:
            ids = estudiantes.objects.get(ci=request.POST['carnet'])
            sol_id = ids.id
            permiso = permisos.objects.filter(project_id=sol_id).order_by('id_solicitud')

            # Agrupar permisos por id_solicitud en una lista de listas
            grouped_permisos = {}
            for id_solicitud, group in groupby(permiso, key=lambda x: x.id_solicitud):
                grouped_permisos[id_solicitud] = list(group)
            return render(request, 'estado.html', {'grouped_permisos': grouped_permisos,})
        except estudiantes.DoesNotExist:
            msg = 'Carnet no encontrado'
            return render(request, 'carnets.html', {'msg': msg,})
        except Exception as e:
            print(e)
            return HttpResponse("Error en la solicitud")

    def invalid_request(self, request):
        return HttpResponse("Acceso no válido")