from django import forms
from registro.models import permisos, estudiantes

class RegistroPermisosForm(forms.ModelForm):
    class Meta:
        model = permisos
        fields = '__all__'

class RegistroEstudiantesForm(forms.ModelForm):
    class Meta:
        model = estudiantes
        fields = '__all__'
