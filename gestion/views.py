from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from registro.models import estudiantes as RegistroEstudiantes
from registro.models import permisos as RegistroPermisos
from .forms import RegistroPermisosForm, RegistroEstudiantesForm
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import JsonResponse

def admin_user_check(user):
    return user.is_authenticated and user.is_staff

class AdminOnlyView(LoginRequiredMixin, View):
    login_url = '/cidimec/licencias-imt/login/'

    def get(self, request):
        if request.user.is_staff:
            permisos = RegistroPermisos.objects.filter(estado='Pendiente').select_related('project')

            # Organizar permisos en un diccionario
            permisos_dict = {}
            for permiso in permisos:
                if permiso.id_solicitud not in permisos_dict:
                    permisos_dict[permiso.id_solicitud] = {'permiso': permiso,'estudiante': permiso.project, 'materias': [],}
                permisos_dict[permiso.id_solicitud]['materias'].append({
                    'materia': permiso.materia,
                    'horaInicio': permiso.horaInicio,
                    'horaFin': permiso.horaFin,
                    'fecha': permiso.fecha,
                })

            # Convertir el diccionario a una lista para usar en la plantilla
            permisos_list = list(permisos_dict.values())

            return render(request, 'petitions/petition_list.html', {'permisos': permisos_list})
        else:
            return render(request, 'petitions/not_authorized.html')


class UpdateObservationView(View):
    def post(self, request):
        if request.method == 'POST':
            petition_id = request.POST.get('petition_id')
            observation = request.POST.get('observation')

            # Retrieve the object to update using the petition_id
            obj_to_update = get_object_or_404(RegistroPermisos, id=petition_id)

            # Update the observation field
            obj_to_update.observaciones = observation

            # Save the changes to the object
            obj_to_update.save()

            # Return a JSON response to indicate success
            return JsonResponse({'message': 'Observation updated successfully'})
        else:
            # Handle other HTTP methods if necessary
            return JsonResponse({'error': 'Invalid request method'}, status=405)