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
      '<select name="permisos-' +
        permisoCount +
        '-horaInicio" aria-describedby="addon-wrapping" class="form-select">\
        <option value="07:15">07:15</option>\
        <option value="07:30">07:30</option>\
        <option value="07:45">07:45</option>\
        <option value="08:00">08:00</option>\
        <option value="08:15">08:15</option>\
        <option value="08:30">08:30</option>\
        <option value="08:45">08:45</option>\
        <option value="09:00">08:00</option>\
        <option value="09:15">09:15</option>\
        <option value="09:30">09:30</option>\
        <option value="09:45">09:45</option>\
        <option value="10:00">10:00</option>\
        <option value="10:15">10:15</option>\
        <option value="10:30">10:30</option>\
        <option value="10:45">10:45</option>\
        <option value="11:00">11:00</option>\
        <option value="11:15">11:15</option>\
        <option value="11:30">11:30</option>\
        <option value="11:45">11:45</option>\
        <option value="12:00">12:00</option>\
        <option value="12:15">12:15</option>\
        <option value="12:30">12:30</option>\
        <option value="12:45">12:45</option>\
        <option value="13:00">13:00</option>\
        <option value="13:15">13:15</option>\
        <option value="13:30">13:30</option>\
        <option value="13:45">13:45</option>\
        <option value="14:00">14:00</option>\
        <option value="14:15">14:15</option>\
        <option value="14:30">14:30</option>\
        <option value="14:45">14:45</option>\
        <option value="15:00">15:00</option>\
        <option value="15:15">15:15</option>\
        <option value="15:30">15:30</option>\
        <option value="15:45">15:45</option>\
        <option value="16:00">16:00</option>\
        <option value="16:15">16:15</option>\
        <option value="16:30">16:30</option>\
        <option value="16:45">16:45</option>\
        <option value="17:00">17:00</option>\
        <option value="17:15">17:15</option>\
        <option value="17:30">17:30</option>\
        <option value="17:45">17:45</option>\
        <option value="18:00">18:00</option>\
        <option value="18:15">18:15</option>\
        <option value="18:30">18:30</option>\
        <option value="18:45">18:45</option>\
        <option value="19:00">19:00</option>\
        <option value="19:15">19:15</option>\
        <option value="19:30">19:30</option>\
        <option value="19:45">19:45</option>\
        <option value="20:00">20:00</option>\
        <option value="20:15">20:15</option>\
        <option value="20:30">20:30</option>\
        <option value="20:45">20:45</option>\
        <option value="21:00">21:00</option>\
        <option value="21:15">21:15</option>\
        <option value="21:30">21:30</option>\
    </select>',
      '<select name="permisos-' +
        permisoCount +
        '-horaFin" aria-describedby="addon-wrapping" class="form-select">\
        <option value="07:15">07:15</option>\
        <option value="07:30">07:30</option>\
        <option value="07:45">07:45</option>\
        <option value="08:00">08:00</option>\
        <option value="08:15">08:15</option>\
        <option value="08:30">08:30</option>\
        <option value="08:45">08:45</option>\
        <option value="09:00">08:00</option>\
        <option value="09:15">09:15</option>\
        <option value="09:30">09:30</option>\
        <option value="09:45">09:45</option>\
        <option value="10:00">10:00</option>\
        <option value="10:15">10:15</option>\
        <option value="10:30">10:30</option>\
        <option value="10:45">10:45</option>\
        <option value="11:00">11:00</option>\
        <option value="11:15">11:15</option>\
        <option value="11:30">11:30</option>\
        <option value="11:45">11:45</option>\
        <option value="12:00">12:00</option>\
        <option value="12:15">12:15</option>\
        <option value="12:30">12:30</option>\
        <option value="12:45">12:45</option>\
        <option value="13:00">13:00</option>\
        <option value="13:15">13:15</option>\
        <option value="13:30">13:30</option>\
        <option value="13:45">13:45</option>\
        <option value="14:00">14:00</option>\
        <option value="14:15">14:15</option>\
        <option value="14:30">14:30</option>\
        <option value="14:45">14:45</option>\
        <option value="15:00">15:00</option>\
        <option value="15:15">15:15</option>\
        <option value="15:30">15:30</option>\
        <option value="15:45">15:45</option>\
        <option value="16:00">16:00</option>\
        <option value="16:15">16:15</option>\
        <option value="16:30">16:30</option>\
        <option value="16:45">16:45</option>\
        <option value="17:00">17:00</option>\
        <option value="17:15">17:15</option>\
        <option value="17:30">17:30</option>\
        <option value="17:45">17:45</option>\
        <option value="18:00">18:00</option>\
        <option value="18:15">18:15</option>\
        <option value="18:30">18:30</option>\
        <option value="18:45">18:45</option>\
        <option value="19:00">19:00</option>\
        <option value="19:15">19:15</option>\
        <option value="19:30">19:30</option>\
        <option value="19:45">19:45</option>\
        <option value="20:00">20:00</option>\
        <option value="20:15">20:15</option>\
        <option value="20:30">20:30</option>\
        <option value="20:45">20:45</option>\
        <option value="21:00">21:00</option>\
        <option value="21:15">21:15</option>\
        <option value="21:30">21:30</option>\
    </select>',
      '<input type="date" name="permisos-' +
        permisoCount +
        '-fecha" aria-describedby="addon-wrapping" class="form-control date-input" onkeydown="return false;" onfocus=\'(this.type="date")\' />',
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
    applyDateRestrictions(); // Aplicar restricciones de fecha a todas las filas
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

  applyDateRestrictions();

  // Función para aplicar restricciones de fecha
  function applyDateRestrictions() {
    const dateInputs = document.querySelectorAll(".date-input");
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 20); // Restringe a 20 días atrás desde la fecha actual

    dateInputs.forEach(function (dateInput) {
      dateInput.min = maxDate.toISOString().split("T")[0];

      // Desactivar edición manual
      dateInput.addEventListener("keydown", function (event) {
        event.preventDefault();
      });

      // Desactivar el calendario desplegable en la entrada de fecha
      dateInput.addEventListener("click", function () {
        this.blur(); // Desenfocar la entrada para evitar que se abra el calendario
      });
    });
  }
});

function validarYAbrirModal() {
  // Validar el formulario externo
  if (document.getElementById("form-permisos").checkValidity()) {
    // Abrir el modal si el formulario externo es válido
    $("#confirmarModal").modal("show");
  } else {
    // El formulario externo no es válido, puedes mostrar un mensaje de error si lo deseas
    alert("Por favor, complete todos los campos del formulario.");
  }
}
