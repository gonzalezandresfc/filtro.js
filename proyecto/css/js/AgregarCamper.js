import { actualizarListaEstudiantes } from "./AgregarCamper.js";

export function agregarCamper() {
    const ID = document.getElementById("numeroIdentificacion").value;
    const Nombre = document.getElementById("estudianteNombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById('correo').value;
    const grupoCamper = document.getElementById('grupoCamper').value;
    const CampCoins = document.getElementById('CampCoins').value;




    // Obtener la lista de estudiantes desde el Local Storage o crear una nueva si no existe
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    estudiantes.push({ });

    // Guardar la lista de estudiantes actualizada en el Local Storage
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

    // Limpiar los campos del formulario
    document.getElementById("estudianteCodigo").value = "";
    document.getElementById("estudianteNombre").value = "";
    document.getElementById("estudianteCarrera").value = "";

    // Actualizar la lista de estudiantes en el formulario de asignación de horarios
    actualizarListaEstudiantes();
}