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
            permisos = RegistroPermisos.objects.filter(estado='Pendiente')
            ids = []
            for permiso in permisos:
                ids.append(permiso.id_solicitud)

            result_list = []
            index_list = []

            count_dict = {}

            for index, item in enumerate(ids):
                if item in count_dict:
                    count_dict[item][0] += 1
                    count_dict[item][1].append(index)
                else:
                    count_dict[item] = [1,[index]]

            for item, (count,indices) in count_dict.items():
                if count > 1:
                    result_list.extend([(item,) * count])
                    if len(indices) > 1:
                        index_list.append(tuple(indices))

            combined_list = []
            for i, permiso in enumerate(permisos):
                materias = []
                materias = [(permiso.materia,permiso.horaInicio,permiso.horaFin,permiso.fecha)]
                for ind,j in enumerate(index_list):
                    if i == j[0]:
                        auxPermisos = RegistroPermisos.objects.filter(id_solicitud = result_list[ind][0],estado='Pendiente')
                        
                        materias = []
                        for auxPermiso in auxPermisos:
                            materias.append((auxPermiso.materia,auxPermiso.horaInicio,auxPermiso.horaFin,auxPermiso.fecha))

                combined_list.append((permiso, permiso.project, materias))

            sorted_data = sorted(index_list, key=lambda x: x[1],reverse=True)
            
            if len(sorted_data)!=0:
                for i in sorted_data:
                    del combined_list[i[1]]

            return render(request, 'petitions/petition_list.html', {'permisos': combined_list})
        else:
            return render(request, 'petitions/not_authorized.html')
    
    def post(self, request):
        if request.POST.get('_method') == 'put':
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
            permiso_id = request.POST.get('permisoid_solicitud')
            new_status = request.POST.get('status')
            permisos = RegistroPermisos.objects.filter(id_solicitud=permiso_id)
            if new_status == 'Aceptado' or new_status == 'Rechazado' or new_status == 'Observado':
                for i in permisos:
                    form = RegistroPermisosForm(request.POST, instance=i)
                for i in permisos:
                    i.estado = new_status
                    i.save()
    
                return redirect('petition_list')
            else:
                return redirect('petition_list')

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