from django.shortcuts import render, redirect
from .forms import CreateNewRegis, PermisosFormSet
from .models import estudiantes, permisos
from .forms import PermisosFormSet

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
                    permiso = form.save(commit=False)
                    permiso.project = estudiantes.objects.get(
                        ci=request.POST['ci'])
                    permiso.id_solicitud = nuevo_id
                    print(request.POST['flexRadioDefault'])
                    permiso.motivo = request.POST['flexRadioDefault']
                    permiso.save()

        return redirect('/cidimec/licencias-imt/registro/')
