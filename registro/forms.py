from django import forms
from django.forms import formset_factory
from .models import permisos

class CreateNewRegis(forms.Form):
    nombre = forms.CharField(label="Nombre(s)", max_length=200)
    apellido = forms.CharField(label="Apellido(s)", max_length=200)
    email = forms.EmailField(label="Correo electrónico", max_length=200)
    ci = forms.IntegerField(label="Cédula de identidad")

class CreateNewPermiso(forms.ModelForm):
    class Meta:
        model = permisos
        fields = ['materia', 'fecha', 'horaInicio', 'horaFin', 'justificacion','descripcion']

PermisosFormSet = formset_factory(CreateNewPermiso, extra=1)