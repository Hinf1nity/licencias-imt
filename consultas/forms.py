from django import forms

class carnet(forms.Form):
    carnet = forms.CharField(label="Ingrese su Carnet de Identidad", min_length=6, max_length=9)
    