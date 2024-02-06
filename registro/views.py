from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import CreateNewRegis, PermisosFormSet
from .models import estudiantes, permisos
from .forms import PermisosFormSet
import datetime

# Create your views here.


def index(request):
    return render(request, 'index.html')


def form_regis(request):
    if request.method == 'GET':
        formset = PermisosFormSet(prefix='permisos')
        return render(request, 'form_regis.html', {'form': CreateNewRegis(), 'formset': formset})
    else:
        if estudiantes.objects.filter(ci=request.POST['ci']).exists() == False:
            estudiantes.objects.create(
                name=request.POST['nombre'],
                apellido=request.POST['apellido'],
                email=request.POST['email'],
                ci=request.POST['ci'],
            )
        else:
            estudiante = estudiantes.objects.get(ci=request.POST['ci'])
            if estudiante.name != request.POST['nombre']:
                return render(request, 'form_regis.html', {'form': CreateNewRegis(), 'msg': 'El carnet existe con otro nombre'})
            elif estudiante.apellido != request.POST['apellido']:
                return render(request, 'form_regis.html', {'form': CreateNewRegis(), 'msg1': 'El carnet existe con otro apellido'})
            elif estudiante.email == "":
                estudiante.email = request.POST['email']
                estudiante.save()
            elif estudiante.email != request.POST['email']:
                return render(request, 'form_regis.html', {'form': CreateNewRegis(), 'msg2': 'El carnet existe con otro email'})
            else:
                pass
        formset = PermisosFormSet(
            data=request.POST, files=request.FILES, prefix='permisos')

        ultimo_registro = permisos.objects.last()
        if ultimo_registro == None:
            nuevo_id = 0
        else:
            nuevo_id = ultimo_registro.id + 1
        if formset.is_valid():
            for form in formset:
                if form.cleaned_data.get('materia') != None:
                    permiso_comp = form.save(commit=False)
                    if permiso_comp.fecha < datetime.date.today() - datetime.timedelta(days=20):
                        return render(request, 'form_regis.html', {'form': CreateNewRegis(), 'msg3': 'Las fechas no deben ser pasados los 20 dias antes de la fecha actual'})
            for form in formset:
                if form.cleaned_data.get('materia') != None:
                    permiso = form.save(commit=False)
                    print(permiso.fecha)
                    permiso.project = estudiantes.objects.get(
                        ci=request.POST['ci'])
                    permiso.id_solicitud = nuevo_id
                    print(request.POST['flexRadioDefault'])
                    permiso.motivo = request.POST['flexRadioDefault']
                    permiso.save()
        messages.success(request, 'Registro de licencia exitoso')

        return redirect('/cidimec/licencias-imt/registro/')
