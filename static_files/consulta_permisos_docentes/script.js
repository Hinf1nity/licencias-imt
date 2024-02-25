document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos del DOM
  var inputBusqueda = document.getElementById("inputBusqueda");
  var listaElementos = document.getElementById("accordionExample");
  var elementos = listaElementos.getElementsByClassName("materia");
  console.log(elementos);

  // Agregar un evento de entrada al campo de búsqueda
  inputBusqueda.addEventListener("input", function () {
    // Obtener el valor de búsqueda
    var busqueda = inputBusqueda.value.toLowerCase();

    // Iterar sobre los elementos y ocultar/mostrar según la búsqueda
    for (var i = 0; i < elementos.length; i++) {
      var textoElemento = elementos[i].innerText.toLowerCase();
      if (textoElemento.includes(busqueda)) {
        elementos[i].style.display = "block";
      } else {
        elementos[i].style.display = "none";
      }
    }
  });
});
