import {state} from "./state.js";
import {changeActiveBtn} from "./app.js";
import {stop} from "./app.js";

const titleTask = document.querySelector('.title');
const tasksList = document.querySelector('.tasks_list');
const countPomodoro = document.querySelector('.count_num');
const windowAddTask = document.querySelector('.add-form');
const windowInputTask = document.querySelector('.task-form');
const cancelBtn = document.querySelector('.cancel-btn');
const saveBtn = document.querySelector('.save-btn');

const li = document.createElement('div');
li.classList.add('todo__item');

const taskAddBtn = document.createElement('button');
taskAddBtn.classList.add('todo_add');
taskAddBtn.classList.add('control');
taskAddBtn.textContent = 'Add new task';
li.append(taskAddBtn);

let input;

export const defaultTask = {
    id: 'default',
    pomodoro:0,
    title: 'Time to focus!',
}
const getTask = () => {
    const tasksList = JSON.parse(localStorage.getItem('pomodoro') || '[]')
    return tasksList;
}

const addTask = (title) => {
    const task = {
        title,
        pomodoro:0,
        id: Math.random().toString(16).substring(2,8),
        editNow:false,
    }

    const taskList = getTask();
    taskList.push(task);
    localStorage.setItem('pomodoro', JSON.stringify(taskList));
    return task;
}

export const updateTask = (task) => {
    const taskList = getTask();
    const taskItem = taskList.find((item) => item.id === task.id);
    taskItem.title = task.title;
    taskItem.pomodoro = task.pomodoro;
    localStorage.setItem('pomodoro', JSON.stringify(taskList));
};

const deleteTask = (task) => {
    const taskList = getTask();
    const newTasksList = taskList.filter((item) => item.id !== task.id);
    if (!newTasksList.length){
        state.activeTask = defaultTask;
    } else {
        if (task.id === state.activeTask.id) {
            state.activeTask = newTasksList[newTasksList.length - 1];
        }
    }
    localStorage.setItem('pomodoro', JSON.stringify(newTasksList));
};

const createTaskListItem = (task) => {
    if (task.id !== 'default') {
        const taskItem = document.createElement('div');
        taskItem.classList.add('.todo__item');

        const taskItemWrapper = document.createElement('div');
        taskItemWrapper.classList.add('todo__item-wrapper');
        taskItem.append(taskItemWrapper);

        const checkBtn = document.createElement('input');
        checkBtn.classList.add('task_checkbox');
        checkBtn.type = 'checkbox';

        const taskBtn = document.createElement('button');
        taskBtn.classList.add('todo__btn')
        taskBtn.textContent = task.title;

        const editBtn = document.createElement('button');
        editBtn.classList.add('todo__edit')
        editBtn.title = 'Edit Task';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('todo__del')
        deleteBtn.title = 'Delete task';


        taskItemWrapper.append(checkBtn, taskBtn, editBtn, deleteBtn);

        tasksList.prepend(taskItem)

        taskBtn.addEventListener('click', () => {
            state.activeTask = task;
            printTasks();
            changeActiveBtn('pomodoro');
            stop();
            closeAddWindow();
        });


        editBtn.addEventListener('click', () => {

            if (task.editNow) {
                task.title = input.value;
                taskBtn.textContent = task.title;
                input.remove();
                updateTask(task);
                printTasks();
                task.editNow = false;
                editBtn.style.backgroundImage = "url('./images/edit.png')";
            } else {
                input = document.createElement('input');
                input.name = task.id;
                input.value = task.title;
                taskBtn.after(input);
                taskBtn.textContent = '';
                task.editNow = true;
                editBtn.style.backgroundImage = "url('./images/ok.png')"
            }
        });

        deleteBtn.addEventListener('click', () => {
            deleteTask(task);
            printTasks();
            taskItem.remove();
        });
    }
}

const renderTasksList = (list) => {
    tasksList.textContent = '';
    list.forEach(createTaskListItem);
    tasksList.append(li);
}

export const printTasks = () => {
        if (state.activeTask){
            titleTask.textContent = state.activeTask.title;
            countPomodoro.textContent = state.activeTask.pomodoro;
        } else {
            titleTask.textContent = '';
            countPomodoro.textContent = '0';
        }
}

const closeAddWindow = () => {
    taskAddBtn.style.display = 'block';
    windowAddTask.style.display = 'none';
    windowInputTask.classList.remove('error');
    windowInputTask.value = '';
}


const addTaskWindow = () => {
    taskAddBtn.style.display = 'none';
    windowAddTask.style.display = 'block';
    cancelBtn.addEventListener('click', closeAddWindow);
    saveBtn.addEventListener('click', () => {
        if (!windowInputTask.value) {
            windowInputTask.classList.add('error');
        } else {
            const tasks = addTask(windowInputTask.value);
            createTaskListItem(tasks);
            closeAddWindow();
        }
    })
}


export const initTasks = () => {
    const tasksList = getTask();

    if (!tasksList.length) {
        state.activeTask = defaultTask;
    } else {
        state.activeTask = tasksList[0];
    }

    printTasks();
    renderTasksList(tasksList);

    taskAddBtn.addEventListener('click', () => {
        addTaskWindow();
    })

}
