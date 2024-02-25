from django.shortcuts import render
from django.views import View
from registro.models import estudiantes as RegistroEstudiantes
from registro.models import permisos as RegistroPermisos

# Create your views here.


class PermisosView(View):
    def get(self, request):
        permisos = RegistroPermisos.objects.filter(estado='Aceptado')
        ids = []
        permisos_dict = {}

        for permiso in permisos:
            if permiso.id_solicitud not in permisos_dict:
                estudiante = RegistroEstudiantes.objects.get(
                    id=permiso.project_id)
                permisos_dict[permiso.id_solicitud] = {
                    'estudiante': estudiante.name + " " + estudiante.apellido, 'materias': [], }
            permisos_dict[permiso.id_solicitud]['materias'].append({
                'materia': permiso.materia,
                'horaInicio': permiso.horaInicio.strftime("%I:%M %p"),
                'horaFin': permiso.horaFin.strftime("%I:%M %p"),
                'fecha': permiso.fecha,
            })
        print([permisos_dict])
        return render(request, 'docente_consulta.html', {'permisos': permisos_dict})
