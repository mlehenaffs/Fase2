// Array simulado de usuarios para validación
const users = [
    { username: 'mlehenaff', password: 'm12345' }
];

// Función para validar inicio de sesión
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-section').style.display = 'block';
        document.getElementById('user-name').textContent = username;
    } else {
        errorMessage.textContent = 'Error de autenticación. Intente nuevamente.';
    }
}

// Función para cerrar sesión
function logout() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error-message').textContent = '';
}

// Función para agregar una tarea a la tabla
function addTask() {
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const startDate = document.getElementById('task-start-date').value;
    const client = document.getElementById('task-client').value;
    const projectId = document.getElementById('task-project-id').value;
    const comments = document.getElementById('task-comments').value;
    const status = document.getElementById('task-status').value;

    // Validación de campos vacíos
    if (!id || !title || !desc || !startDate || !client || !projectId) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Concatenar la fecha al primer comentario
    const currentDate = new Date().toLocaleString();
    const initialComment = comments ? `${comments} (Creado el: ${currentDate})` : `(Creado el: ${currentDate})`;

    // Agregar la tarea a la tabla
    const table = document.getElementById('task-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${desc}</td>
        <td>${startDate}</td>
        <td>${client}</td>
        <td>${projectId}</td>
        <td><ul class="comment-list"><li>${initialComment}</li></ul></td>
        <td>${status}</td>
        <td><button class="select-update-button" onclick="selectTaskToUpdate(this.closest('tr'))">Seleccionar para actualizar</button></td>
    `;

    // Limpiar los campos de captura
    document.getElementById('task-form').reset();
}

// Función para seleccionar la tarea a actualizar
let selectedRow = null;
function selectTaskToUpdate(row) {
    const id = row.cells[0].textContent;
    const title = row.cells[1].textContent;
    const description = row.cells[2].textContent;
    const startDate = row.cells[3].textContent;
    const client = row.cells[4].textContent;
    const projectId = row.cells[5].textContent;
    const comments = row.cells[6].textContent;
    const status = row.cells[7].textContent;

    // Rellenar el formulario de actualización con los datos de la tarea seleccionada
    document.getElementById('update-task-id').value = id;
    document.getElementById('update-task-title').value = title;
    document.getElementById('update-task-desc').value = description;
    document.getElementById('update-task-start-date').value = startDate;
    document.getElementById('update-task-client').value = client;
    document.getElementById('update-task-project-id').value = projectId;
    document.getElementById('new-comment').value = ''; // Vaciar el campo de comentario para actualización
    document.getElementById('update-task-status').value = status;

    // Mostrar solo los campos de comentarios y estatus
    document.getElementById('update-task-form').style.display = 'block';

    selectedRow = row;
}

// Función para actualizar la tarea
function updateTask() {
    if (!selectedRow) {
        alert('Por favor, selecciona una tarea para actualizar.');
        return;
    }

    const newComment = document.getElementById('new-comment').value;
    const status = document.getElementById('update-task-status').value;

    if (newComment) {
        const currentDate = new Date().toLocaleString();
        // Concatenar comentario con salto de línea
        const updatedComment = `${newComment} (Actualizado el: ${currentDate})`;

        // Obtener los comentarios anteriores de la celda
        let existingComments = selectedRow.cells[6].querySelectorAll('li');
        
        // Crear una lista para los comentarios
        let commentList = [];

        // Agregar los comentarios previos a la lista
        existingComments.forEach(comment => {
            commentList.push(comment.innerHTML);
        });

        // Agregar el nuevo comentario al final de la lista
        commentList.push(updatedComment);

        // Crear una nueva lista HTML de comentarios con viñetas
        let formattedComments = '<ul>';
        commentList.forEach(comment => {
            formattedComments += `<li>${comment}</li>`;
        });
        formattedComments += '</ul>';

        // Actualizar la celda de comentarios con la nueva lista
        selectedRow.cells[6].innerHTML = formattedComments;
    }

    // Actualizar el estatus
    selectedRow.cells[7].textContent = status;

    // Limpiar los campos de actualización
    document.getElementById('update-task-form').reset();

    // Volver a ocultar los campos de actualización
    document.getElementById('update-task-form').style.display = 'none';

    // Limpiar la fila seleccionada
    selectedRow = null;
}

// Función para filtrar tareas por estatus
function filterTasks() {
    const filterValue = document.getElementById('status-filter').value.toLowerCase(); // Obtener el valor seleccionado
    const rows = document.querySelectorAll('#task-table tbody tr'); // Obtener todas las filas de la tabla

    rows.forEach(row => {
        const status = row.cells[7].textContent.toLowerCase(); // Obtener el estatus de la tarea
        if (filterValue === "" || status.includes(filterValue)) {
            row.style.display = ''; // Mostrar la fila si coincide con el filtro
        } else {
            row.style.display = 'none'; // Ocultar la fila si no coincide con el filtro
        }
    });
}