document.addEventListener("DOMContentLoaded", function () {
  var inputBusqueda = document.getElementById("inputBusqueda");
  var listaElementos = document.getElementById("accordionExample");
  var acordeones = listaElementos.getElementsByClassName("accordion-item");

  // Agregar un evento de entrada al campo de búsqueda
  inputBusqueda.addEventListener("input", function () {
    // Obtener el valor de búsqueda
    var busqueda = inputBusqueda.value.toLowerCase();

    for (var i = 0; i < acordeones.length; i++) {
      var materias = acordeones[i].getElementsByClassName("materia");
      for (var j = 0; j < materias.length; j++) {
        var textoElemento = materias[j].innerText.toLowerCase();
        if (textoElemento.includes(busqueda)) {
          acordeones[i].style.display = "block";
          break;
        } else {
          acordeones[i].style.display = "none";
        }
      }
      if (acordeones[i].style.display == "block") {
        var permiso = acordeones[i].getElementsByClassName("permiso");
        for (var j = 0; j < permiso.length; j++) {
          var textoElemento = materias[j].innerText.toLowerCase();
          if (textoElemento.includes(busqueda)) {
            permiso[j].style.display = "block";
          } else {
            permiso[j].style.display = "none";
          }
        }
      }
    }
  });
});
