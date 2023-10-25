export function actualizarListaEstudiantes() {
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    const select = document.getElementById("estudianteSelect");
    select.innerHTML = "";

    estudiantes.forEach((estudiante) => {
        const option = document.createElement("option");
        option.value = estudiante.codigo;
        option.textContent = estudiante.nombre;
        select.appendChild(option);
    });
}