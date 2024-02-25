document.addEventListener("DOMContentLoaded", function () {
  var inputBusqueda = document.getElementById("inputBusqueda");
  var inputHoraInicio = document.getElementById("inputHoraInicio");
  var listaElementos = document.getElementById("accordionExample");
  var acordeones = listaElementos.getElementsByClassName("accordion-item");

  // Agregar un evento de entrada al campo de búsqueda
  inputBusqueda.addEventListener("input", function () {
    // Obtener el valor de búsqueda
    var busqueda = inputBusqueda.value.toLowerCase();
    var busqueda2 = inputHoraInicio.value.toLowerCase();
    for (var i = 0; i < acordeones.length; i++) {
      var materias = acordeones[i].getElementsByClassName("materia");
      if (busqueda2 == "") {
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
      } else {
        var hora = acordeones[i].getElementsByClassName("horaInicio");
        for (var j = 0; j < hora.length; j++) {
          var textoElemento2 = hora[j].innerText.toLowerCase();
          var textoElemento = materias[j].innerText.toLowerCase();
          if (
            textoElemento.includes(busqueda) &&
            textoElemento2.includes(busqueda2)
          ) {
            acordeones[i].style.display = "block";
            break;
          } else {
            acordeones[i].style.display = "none";
          }
          if (acordeones[i].style.display == "block") {
            var permiso2 = acordeones[i].getElementsByClassName("permiso");
            for (var k = 0; k < permiso2.length; k++) {
              var textoElemento = materias[k].innerText.toLowerCase();
              var textoElemento2 = hora[k].innerText.toLowerCase();
              if (
                textoElemento.includes(busqueda) &&
                textoElemento2.includes(busqueda2)
              ) {
                permiso2[k].style.display = "block";
              } else {
                permiso2[k].style.display = "none";
              }
            }
          }
        }
      }
    }
  });
  // Agregar un evento de entrada al campo de búsqueda
  inputHoraInicio.addEventListener("input", function () {
    // Obtener el valor de búsqueda
    var busqueda2 = inputHoraInicio.value.toLowerCase();
    var busqueda = inputBusqueda.value.toLowerCase();
    for (var i = 0; i < acordeones.length; i++) {
      var hora = acordeones[i].getElementsByClassName("horaInicio");
      if (busqueda == "") {
        console.log("if");
        for (var j = 0; j < hora.length; j++) {
          var textoElemento = hora[j].innerText.toLowerCase();
          if (textoElemento.includes(busqueda2)) {
            acordeones[i].style.display = "block";
            break;
          } else {
            acordeones[i].style.display = "none";
          }
        }
        if (acordeones[i].style.display == "block") {
          var permiso2 = acordeones[i].getElementsByClassName("permiso");
          for (var j = 0; j < permiso2.length; j++) {
            var textoElemento = hora[j].innerText.toLowerCase();
            if (textoElemento.includes(busqueda2)) {
              permiso2[j].style.display = "block";
            } else {
              permiso2[j].style.display = "none";
            }
          }
        }
      } else {
        var materias = acordeones[i].getElementsByClassName("materia");
        for (var j = 0; j < materias.length; j++) {
          var textoElemento2 = materias[j].innerText.toLowerCase();
          var textoElemento = hora[j].innerText.toLowerCase();
          if (
            textoElemento.includes(busqueda2) &&
            textoElemento2.includes(busqueda)
          ) {
            acordeones[i].style.display = "block";
            break;
          } else {
            acordeones[i].style.display = "none";
          }
          if (acordeones[i].style.display == "block") {
            var permiso2 = acordeones[i].getElementsByClassName("permiso");
            for (var k = 0; k < permiso2.length; k++) {
              var textoElemento = hora[k].innerText.toLowerCase();
              if (
                textoElemento.includes(busqueda2) &&
                textoElemento2.includes(busqueda)
              ) {
                permiso2[k].style.display = "block";
              } else {
                permiso2[k].style.display = "none";
              }
            }
          }
        }
      }
    }
  });
});
