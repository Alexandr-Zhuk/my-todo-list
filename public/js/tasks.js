const addTaskForm = document.querySelector('.add-task');
const tasksList = document.querySelector('.tasks-list');
const showFormButton = document.querySelector('.button-add-task-item');
const cancelButton = document.querySelector('.cancel-btn');
const taskInput = document.querySelector('input[name="taskName"]');

const renderTasks = (data) => {
    let html = '<ul>';
    data.data.forEach(item => {
        html += `<li>${item.taskName}</li>`;
    });
    html += '</ul>';
    
    tasksList.innerHTML = html;
};

const getTasks = async() => {
    const data = await axios.get('/tasks/list');

    console.log(data);
    renderTasks(data);
};

const addTask = async(ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target); 
    const taskList = await axios.post('/tasks/add', formData);
    renderTasks(taskList);
    taskInput.value = '';
}

getTasks();

showFormButton.addEventListener('click', () => {
    addTaskForm.classList.remove('hidden');
});

cancelButton.addEventListener('click', () => {
    addTaskForm.classList.add('hidden');
})

addTaskForm.addEventListener('submit', addTask);