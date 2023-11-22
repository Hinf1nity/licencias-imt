document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("agregar-materia");
    const confirmButton = document.getElementById("confirmarGuardar");
    const deleteButton = document.getElementById("eliminar-materia");
    const tbody = document.getElementById("permisos-cuerpo");
    let permisoCount = window.permisoCount;
  
    addButton.addEventListener("click", function() {
        const newRow = document.createElement("tr");
        newRow.className = "permiso-fila";
  

        let campos = [
            '<input type="text" name="permisos-' + permisoCount + '-materia" aria-describedby="addon-wrapping" class="form-control">',
            '<input type="time" name="permisos-' + permisoCount + '-horaInicio" aria-describedby="addon-wrapping" class="form-control">',
            '<input type="time" name="permisos-' + permisoCount + '-horaFin" aria-describedby="addon-wrapping" class="form-control">',
            '<input type="date" name="permisos-' + permisoCount + '-fecha" aria-describedby="addon-wrapping" class="form-control">'
        ]

        let labels = [
            '<label for="id_permisos-' + permisoCount + '-materia"></label>\n',
            '<label for="id_permisos-' + permisoCount + '-horaInicio"></label>\n',
            '<label for="id_permisos-' + permisoCount + '-horaFin"></label>\n',
            '<label for="id_permisos-' + permisoCount + '-fecha"></label>\n'
        ]

        newRow.innerHTML = '<th scope="row">' + (permisoCount + 1) + '</th>';
        for (let i = 0; i < campos.length; i++) {
            const divisorCampo = document.createElement("td");
            divisorCampo.innerHTML = labels[i] + campos[i];
            newRow.appendChild(divisorCampo);
        }
        tbody.appendChild(newRow);
        permisoCount++;
        document.getElementById('id_permisos-TOTAL_FORMS').value = permisoCount;
    });
    deleteButton.addEventListener("click", function() {
        const permisos = tbody.querySelectorAll(".permiso-fila");
        if (permisos.length > 1) {
            const lastPermiso = tbody.querySelector(".permiso-fila:last-child");
            if (lastPermiso) {
                tbody.removeChild(lastPermiso);
                permisoCount--;
                document.getElementById('id_permisos-TOTAL_FORMS').value = permisoCount;
            }
        }
    });
    confirmButton.addEventListener("click", function() {
        document.getElementById("form-permisos").submit();
    });
});