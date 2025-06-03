const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit',function(e) {
    e.preventDefault();

    const taskText = input.value.trim();
    if (taskText === '') return;

    const task = {text: taskText, completed: false};
    addTaskToDOM(task);
    saveToLocalStorage(task);
    input.value = '';
})

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        toggleTaskCompletion(task.text)
    }
    )

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        deleteFromLocalStorage(task);
    });

    li.appendChild(deleteBtn)
    list.appendChild(li);
}

function saveToLocalStorage(task) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(task)
    localStorage.setItem('todos',JSON.stringify(todos));
}

function loadTasks() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(task => addTaskToDOM(task));
}

function deleteFromLocalStorage(taskToDelete) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t.text !== taskToDelete.text);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function toggleTaskCompletion(taskText) {
    let todos =JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(t => {
        if(t.text === taskText) {
            return{...t, completed: !t.completed};
        }
        return t;
    });
    localStorage.setItem('todos',JSON.stringify(todos))
}