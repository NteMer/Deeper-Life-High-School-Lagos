const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');

let draggedItem = null;
function createTask (taskText) {

    const taskItem = document.createElement('li');
    taskItem.classList.add('todo-item');
    taskItem.setAttribute('dragabble', true)
    
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskItem.appendChild(taskContent);

    // create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete'
    taskItem.appendChild(deleteButton);

    // Mark the task as completed
    taskContent.addEventListener('click', function () {
        taskContent.classList.toggle('completed');
    })

    // Remove the task when the delete button is clicked
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(taskItem);
    })

    // Drag and drop feature
    taskItem.addEventListener('dragstart', function () {
        draggedItem = taskItem;
        setTimeout(() => {
            taskItem.style.display = 'none'
        }, 0);
    });

    taskItem.addEventListener('dragend', function () {
        draggedItem = taskItem;
        setTimeout(() => {
        taskItem.style.display = 'flex';
        draggedItem = null;
        }, 0);
    });

    taskItem.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    taskItem.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.transform = 'scale(1.05)';
    });
    taskItem.addEventListener('dragleave', function () {
        this.style.transform = 'scale(1)';
    });

    taskItem.addEventListener('drop', function () {
        this.style.transform = 'scale(1)';
        if (this !== draggedItem) {
            todoList.insertBefore(draggedItem, this)
        }
    })

    todoList.appendChild(taskItem)
}

addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTask(taskText);
        taskInput.value = '';
    } else {
        alert('Please enter a task');
    }
});


taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});