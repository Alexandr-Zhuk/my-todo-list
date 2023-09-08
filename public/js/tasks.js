const addTaskForm = document.querySelector('.add-task');
const tasksList = document.querySelector('.tasks-list');
const showFormButton = document.querySelector('.button-add-task-item');
const cancelButton = document.querySelector('.cancel-btn');
const taskInput = document.querySelector('input[name="taskName"]');
const categoryList = document.querySelector('.category-list');
const priorityList = document.querySelector('.priority-list');
const categoryFilterList = document.querySelector('.category-filter-list');

const renderTasks = (data) => {
    console.log(data.data);
    let html = '<ul>';
    data.data.forEach(item => {
        if(item.isDone === false){            
            let category = '';
            let priority = '';
            let dateExp = '';
            if(item.category !== null){
                category = `<div class="task-category">${item.category.categoryName}</div>`;
            }
            if(item.priority !== null){
                priority = `<div class="task-priority">${item.priority.priority}</div>`;
            }
            if(item.expireDate !== null){
                dateExp = `<div class="task-exp-date">${moment(item.expireDate).format('DD-MM-YYYY')}</div>`;
            }
            html += 
                `<li class="task-item" data-id="${item._id}">
                    <div class="task-info">
                        <div class="task-name">${item.taskName}</div>
                        <div class="task-buttons">
                            <div class="task-done"><img src="/icons/free-icon-font-check.svg" width="20px" height="20px"></div>
                            <div class="task-del"><img src="/icons/free-icon-font-trash.svg" width="20px" height="20px"></div>
                        </div>
                    </div>
                    
                    <div class="task-categ-prior">
                            ${dateExp}
                            ${category}
                            ${priority}
                    </div>
                </li>`;
        }
    });
    html += '</ul>';
    
    tasksList.innerHTML = html;
};

const renderCategories = (data) => {
    let html = '<option value="" disabled selected>Выберите категорию</option>';
    data.data.forEach(item => html = html + `<option value="${item._id}">${item.categoryName}</option>`);
    categoryList.innerHTML = html;
};

const renderPriorities = (data) => {
    let html = '<option value="" disabled selected>Выберите приоритетность</option>';
    data.data.forEach(item => html = html + `<option value="${item._id}">${item.priority}</option>`);
    priorityList.innerHTML = html;
};

const renderFilterCategories = (data) => {
    let html = '';
    data.data.forEach(item => html += `<li data-id="${item._id}" class="category-filter-item"><a href="#">${item.categoryName}</a></li>`);
    categoryFilterList.innerHTML = html;
};

const getTasks = async() => {
    const data = await axios.get('/tasks/list');
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

const taskItem = document.querySelector('.task-item');
console.log(taskItem);

const changeStatus = async(id, item) => {
    const data = {
        id: id,
        isDone: true
    };
    item.closest('.task-item').querySelector('.task-name').classList.add('thrown');
  
    await axios.post('/tasks/change', data);
    setTimeout(getTasks, 2000);
};

const getCategories = async() => {
    const categList = await axios.get('/category/list');
    renderCategories(categList);
    renderFilterCategories(categList);
};

getCategories();

const getPriorities = async() => {
    const priorList = await axios.get('/priority/list');
    renderPriorities(priorList);
};

getPriorities();

const deleteTask = async(id) => {
    const data = {id: id};
    const taskList = await axios.post('/tasks/delete', data);
    renderTasks(taskList);
};

showFormButton.addEventListener('click', () => {
    addTaskForm.classList.remove('hidden');
    showFormButton.classList.add('hidden');
});

cancelButton.addEventListener('click', () => {
    addTaskForm.classList.add('hidden');
    showFormButton.classList.remove('hidden');
})

tasksList.addEventListener('click', (ev) => {
    const id = ev.target.closest('.task-item').dataset.id;
    console.log(ev.target)

    if(ev.target.closest('.task-done')){
        changeStatus(id, ev.target);
    }

    if(ev.target.closest('.task-del')){
        deleteTask(id);
    }
});

addTaskForm.addEventListener('submit', addTask);