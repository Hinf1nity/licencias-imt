from django.shortcuts import render
from django.views import View
from registro.models import estudiantes as RegistroEstudiantes
from registro.models import permisos as RegistroPermisos

# Create your views here.


class PermisosView(View):
    def get(self, request):
        #permisos = RegistroPermisos.objects.filter(estado='Aceptado')
        permisos = RegistroPermisos.objects.all()
        ids = []
        permisos_dict = {}
        permisos = permisos.order_by('-fecha')

        for permiso in permisos:
            if permiso.project_id not in permisos_dict:
                estudiante = RegistroEstudiantes.objects.get(
                    id=permiso.project_id)
                permisos_dict[permiso.project_id] = {
                    'estudiante': estudiante.name + " " + estudiante.apellido, 'materias': [], }
            permisos_dict[permiso.project_id]['materias'].append({
                'materia': permiso.materia,
                'horaInicio': permiso.horaInicio.strftime("%H:%M"),
                'horaFin': permiso.horaFin.strftime("%H:%M"),
                'fecha': permiso.fecha,
                'estado': permiso.estado,
            })

        return render(request, 'docente_consulta.html', {'permisos': permisos_dict})
