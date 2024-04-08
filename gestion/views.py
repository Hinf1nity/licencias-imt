from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from registro.models import estudiantes as RegistroEstudiantes
from registro.models import permisos as RegistroPermisos
from .forms import RegistroPermisosForm, RegistroEstudiantesForm
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

def admin_user_check(user):
    return user.is_authenticated and user.is_staff

def send_notification_email(estudiante_nombre, estado, email, materia):
    
    subject = f'Actualización de estado de solicitud de licencia'
    #subject2 = f'Estudiante: {estudiante_nombre}; Actualización de estado de solicitud de licencia'
    materias_str = ', '.join(materia)
    #message_inge = (f"La solicitud de licencia realiza por el/la estudiante: {estudiante_nombre} fue "
    #                f"{estado} en la(s) materia(s) de {materias_str}. \n\n"
    #                "Saludos cordiales.")
    if estado != 'Observado':
        message = (f"Estimado/a {estudiante_nombre},\n\n"
            f"Te informamos que la solicitud de licencia realizada fue "
            f"{estado} en la(s) materia(s) de {materias_str}.\n\n"
            "Saludos cordiales.")
    else: 
        message = (f"Estimado/a {estudiante_nombre},\n\n"
            f"Te informamos que la solicitud de licencia realizada fue "
            f"{estado} en la(s) materia(s) de {materias_str}.\n\n" 
            f"Por lo que se deja la consideración de la misma, al/los docente(s) de la(s) materia(s).\n\n"
            f"En el caso de tener algún documento/justificativo adicional puedes subirlo en la sección de 'Consultas' en los"
            f" siguientes dos días. \n\n" 
            "Saludos cordiales.")
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(subject, message, email_from, recipient_list)
    #send_mail(subject2, message_inge, email_from, ["samu28n04@gmail.com"])
    
class AdminOnlyView(LoginRequiredMixin, View):
    login_url = '/cidimec/licencias-imt/login/'

    def get(self, request):
        if request.user.is_staff:
            permisos = RegistroPermisos.objects.filter(estado='Pendiente').select_related('project')
            ids = []
            for permiso in permisos:
                ids.append(permiso.id_solicitud)

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
            print(permiso_id)
            permisos = RegistroPermisos.objects.filter(id_solicitud=permiso_id)
            mat_int= RegistroPermisos.objects.filter(id_solicitud=permiso_id)
            materias_que = [permiso.materia for permiso in mat_int]
            id_estudiante = get_object_or_404(RegistroPermisos, id=permiso_id)
            nombre = id_estudiante.project.name
            apellido = id_estudiante.project.apellido
            email = id_estudiante.project.email
            materia=materias_que
            print(materia)
            
            print(email)
            if new_status == 'Aceptado' or new_status == 'Rechazado' or new_status == 'Observado':
                for i in permisos:
                    form = RegistroPermisosForm(request.POST, instance=i)
                for i in permisos:
                    i.estado = new_status
                    i.save()
                send_notification_email(nombre+" "+apellido, new_status, email, materia)
                

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