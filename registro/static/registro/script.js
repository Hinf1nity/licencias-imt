document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("agregar-materia");
  const confirmButton = document.getElementById("confirmarGuardar");
  const deleteButton = document.getElementById("eliminar-materia");
  const tbody = document.getElementById("permisos-cuerpo");
  let permisoCount = window.permisoCount;

  addButton.addEventListener("click", function () {
    const newRow = document.createElement("tr");
    newRow.className = "permiso-fila";

    let campos = [
      '<select class="form-select" name="permisos-' +
        permisoCount +
        '-materia" aria-label="Default select example">\
        <option selected>-</option>\
        <option value="Automatización Industrial">Automatización Industrial</option>\
        <option value="Autotrónica">Autotrónica</option>\
        <option value="Circuitos Digitales">Circuitos Digitales</option>\
        <option value="Circuitos Electrónicos I">Circuitos Electrónicos I</option>\
        <option value="Circuitos Electrónicos II">Circuitos Electrónicos II</option>\
        <option value="Circuitos Electrónicos III">Circuitos Electrónicos III</option>\
        <option value="Control I">Control I</option>\
        <option value="Control II">Control II</option>\
        <option value="Diseño de Máquinas">Diseño de Máquinas</option>\
        <option value="Diseño Superior de Ingenieria">Diseño Superior de Ingenieria</option>\
        <option value="Electrónica de Potencia">Electrónica de Potencia</option>\
        <option value="Fundamentos de Control">Fundamentos de Control</option>\
        <option value="Instrumentación Industrial">Instrumentación Industrial</option>\
        <option value="Introducción a la Ing. Mecatrónica">Introducción a la Ing.Mecatrónica</option>\
        <option value="Manufatura Integrada">Manufatura Integrada</option>\
        <option value="Máquinas Eléctricas">Máquinas Eléctricas</option>\
        <option value="Mecanismos">Mecanismos</option>\
        <option value="Neumática e Hidráulica">Neumática e Hidráulica</option>\
        <option value="Prácticas Preprofesionales">Prácticas Preprofesionales</option>\
        <option value="Programación Superior">Programación Superior</option>\
        <option value="Prototipado Rápido">Prototipado Rápido</option>\
        <option value="Robótica">Robótica</option>\
        <option value="Señales y Sistemas">Señales y Sistemas</option>\
        <option value="Sistemas Embebidos I">Sistemas Embebidos I</option>\
        <option value="Sistemas Embebidos II">Sistemas Embebidos II</option>\
        <option value="Taller de Grado I">Taller de Grado I</option>\
        <option value="Taller de Grado II">Taller de Grado II</option>\
        <option value="Tecnología Mecánica">Tecnología Mecánica</option>\
        <option value="Visión Artificial">Visión Artificial</option>\
        </select>',
      '<input type="time" name="permisos-' +
        permisoCount +
        '-horaInicio" aria-describedby="addon-wrapping" class="form-control">',
      '<input type="time" name="permisos-' +
        permisoCount +
        '-horaFin" aria-describedby="addon-wrapping" class="form-control">',
      '<input type="date" name="permisos-' +
        permisoCount +
        '-fecha" aria-describedby="addon-wrapping" class="form-control">',
    ];

    let labels = [
      '<label for="id_permisos-' + permisoCount + '-materia"></label>\n',
      '<label for="id_permisos-' + permisoCount + '-horaInicio"></label>\n',
      '<label for="id_permisos-' + permisoCount + '-horaFin"></label>\n',
      '<label for="id_permisos-' + permisoCount + '-fecha"></label>\n',
    ];

    newRow.innerHTML = '<th scope="row">' + (permisoCount + 1) + "</th>";
    for (let i = 0; i < campos.length; i++) {
      const divisorCampo = document.createElement("td");
      divisorCampo.innerHTML = labels[i] + campos[i];
      newRow.appendChild(divisorCampo);
    }
    tbody.appendChild(newRow);
    permisoCount++;
    document.getElementById("id_permisos-TOTAL_FORMS").value = permisoCount;
  });
  deleteButton.addEventListener("click", function () {
    const permisos = tbody.querySelectorAll(".permiso-fila");
    if (permisos.length > 1) {
      const lastPermiso = tbody.querySelector(".permiso-fila:last-child");
      if (lastPermiso) {
        tbody.removeChild(lastPermiso);
        permisoCount--;
        document.getElementById("id_permisos-TOTAL_FORMS").value = permisoCount;
      }
    }
  });
  confirmButton.addEventListener("click", function () {
    document.getElementById("form-permisos").submit();
  });
});
