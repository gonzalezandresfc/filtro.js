import { actualizarListaCursos } from "./Actualisa.cursos.js";
import { agregarCamper } from "./AgregarEst.js";
import { actualizarListaEstudiantes } from "./AtualiozarListaEst.js";

// Función para limpiar el localStorage antes de cerrar la ventana
window.addEventListener("beforeunload", function () {
    // Limpiar el localStorage al cerrar la ventana
    localStorage.clear();
});

// Función para agregar un estudiante
// document.getElementById('agregarEstudiante').addEventListener('click',agregarEstudiante)
agregarEstudiante()

// Función para agregar un curso
function agregarCurso() {
    const codigo = document.getElementById("cursoCodigo").value;
    const nombre = document.getElementById("cursoNombre").value;
    const especialidad = document.getElementById("cursoEspecialidad").value;
    const duracion = document.getElementById("cursoDuracion").value;
    const creditos = document.getElementById("cursoCreditos").value;

    // Obtener la lista de cursos desde el Local Storage o crear una nueva si no existe
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    actualizarListaHorarios
    cursos.push({ codigo, nombre, especialidad, duracion, creditos });

    // Guardar la lista de cursos actualizada en el Local Storage
    localStorage.setItem("cursos", JSON.stringify(cursos));

    // Limpiar los campos del formulario
    document.getElementById("cursoCodigo").value = "";
    document.getElementById("cursoNombre").value = "";
    document.getElementById("cursoEspecialidad").value = "";
    document.getElementById("cursoDuracion").value = "";
    document.getElementById("cursoCreditos").value = "";

    // Actualizar la lista de cursos en el formulario de asignación de horarios
    actualizarListaCursos();
}

// Función para asignar un horario
function asignarHorario() {
    const codigoEstudiante = document.getElementById("estudianteSelect").value;
    const codigoCurso = document.getElementById("cursoSelect").value;
    const dia = document.getElementById("horarioDia").value;
    const horaInicio = document.getElementById("horarioHoraInicio").value;
    const horaFin = document.getElementById("horarioHoraFin").value;

    // Obtener la lista de horarios desde el Local Storage o crear una nueva si no existe
    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];

    horarios.push({ codigoEstudiante, codigoCurso, dia, horaInicio, horaFin });

    // Guardar la lista de horarios actualizada en el Local Storage
    localStorage.setItem("horarios", JSON.stringify(horarios));

    // Limpiar los campos del formulario
    document.getElementById("estudianteSelect").value = "";
    document.getElementById("cursoSelect").value = "";
    document.getElementById("horarioDia").value = "";
    document.getElementById("horarioHoraInicio").value = "";
    document.getElementById("horarioHoraFin").value = "";

    // Actualizar la lista de horarios asignados
    actualizarListaHorarios();
}

// Función para actualizar la lista de estudiantes en el formulario de asignación de horarios


// Función para actualizar la lista de cursos en el formulario de asignación de horarios


// Función para actualizar la lista de horarios asignados
function actualizarListaHorarios() {
    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];
    const horariosTable = document.getElementById("horariosTable");
    const horariosList = document.getElementById("horariosList");
    horariosList.innerHTML = '';

    // Limpiar el contenido de la tabla
    console.log(horariosTable);

    horarios.forEach((horario, index) => {
        const estudianteNombre = obtenerNombreEstudiante(horario.codigoEstudiante);
        const cursoNombre = obtenerNombreCurso(horario.codigoCurso);

        const row = horariosList.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);

        cell1.innerHTML = estudianteNombre;
        cell2.innerHTML = cursoNombre;
        cell3.innerHTML = horario.dia;
        cell4.innerHTML = horario.horaInicio;
        cell5.innerHTML = horario.horaFin;

        // Botón "Editar"
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => abrirModalEditar(index);
        cell6.appendChild(editButton);

        // Botón "Eliminar"
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => eliminarHorario(index);
        cell7.appendChild(deleteButton);
    });
}


// modal

// Función para editar horario

function editarHorario (index){
    
}

// Función para eliminar un horario
function eliminarHorario(index) {
    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];
    // Elimina el horario en el índice proporcionado
    horarios.splice(index, 1);
    // Guarda la lista de horarios actualizada en el Local Storage
    localStorage.setItem("horarios", JSON.stringify(horarios));
    // Actualiza la lista de horarios asignados
    actualizarListaHorarios();
}

// Función para guardar los cambios en un horario editado
function guardarCambios() {
    // Obten los valores editados desde el modal
    const diaEditado = document.getElementById("editHorarioDia").value;
    const horaInicioEditada = document.getElementById("editHorarioHoraInicio").value;
    const horaFinEditada = document.getElementById("editHorarioHoraFin").value;

    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];

    // Actualiza el horario editado
    const index = parseInt(document.getElementById("editHorarioIndex").value);
    if (index >= 0 && index < horarios.length) {
        horarios[index].dia = diaEditado;
        horarios[index].horaInicio = horaInicioEditada;
        horarios[index].horaFin = horaFinEditada;
    }

    // Guarda la lista de horarios actualizada en el Local Storage
    localStorage.setItem("horarios", JSON.stringify(horarios));

    // Cierra el modal después de guardar los cambios
    cerrarModalEditar();

    // Actualiza la lista de horarios
    actualizarListaHorarios();
}



// Función para obtener el nombre de un estudiante por su código
function obtenerNombreEstudiante(codigo) {
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    const estudiante = estudiantes.find((est) => est.codigo === codigo);
    return estudiante ? estudiante.nombre : "Desconocido";
}

// Función para obtener el nombre de un curso por su código
function obtenerNombreCurso(codigo) {
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const curso = cursos.find((crs) => crs.codigo === codigo);
    return curso ? curso.nombre : "Desconocido";
}

// Función para cambiar el modo

function cambiarModo() {
    const themeStylesheet = document.getElementById("theme-stylesheet");
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = themeStylesheet.getAttribute("href");

    console.log(currentTheme);

    if (currentTheme === "./css/styles.css") {
        themeStylesheet.setAttribute("href", "./css/dark-theme.css");
        themeToggle.textContent = "Cambiar a Modo Claro";
        localStorage.setItem("theme", "dark");
    } else {
        themeStylesheet.setAttribute("href", "./css/styles.css");
        themeToggle.textContent = "Cambiar a Modo Oscuro";
        localStorage.setItem("theme", "light");
    }
}


// Cargar los datos al iniciar la página
actualizarListaEstudiantes();
actualizarListaCursos();
actualizarListaHorarios();