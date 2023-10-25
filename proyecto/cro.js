// Array para almacenar elementos
let elementos = [];

// Función para crear un nuevo elemento
function crearElemento() {
    const input = document.getElementById("new-element");
    const nuevoElemento = input.value;

    if (nuevoElemento !== "") {
        elementos.push(nuevoElemento);
        actualizarLista();
        input.value = "";
    }
}

// Función para actualizar la lista
function actualizarLista() {
    const lista = document.getElementById("element-list");
    lista.innerHTML = "";

    elementos.forEach((elemento, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${elemento} <button onclick="editarElemento(${index})">Editar</button> <button onclick="borrarElemento(${index})">Borrar</button>`;
        lista.appendChild(listItem);
    });
}

// Función para editar un elemento
function editarElemento(index) {
    const nuevoNombre = prompt("Editar elemento:", elementos[index]);

    if (nuevoNombre !== null) {
        elementos[index] = nuevoNombre;
        actualizarLista();
    }
}

// Función para borrar un elemento
function borrarElemento(index) {
    elementos.splice(index, 1);
    actualizarLista();
}

// Cargar la lista inicial
actualizarLista();
