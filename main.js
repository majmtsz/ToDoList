const btnAddTask = document.querySelector('button');
const form = document.querySelector('form');
const inputAddTask = document.querySelector('input');
const numberOfThingsToDo = document.querySelector('h1 span');
const ulThingsToDo = document.querySelector('ul');
const deleteButtons = document.getElementsByClassName('delete');
const searchForInput = document.getElementsByClassName('searchForInput');
const h1 = document.querySelector('h1');
const tasks = document.getElementsByClassName('task');
const toDoList = [];

// adding tasks
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTaskDescription = inputAddTask.value;
    if (!newTaskDescription) {
        alert('zadanie musi mieć opis')
    } else {
        inputAddTask.value = '';
        const li = document.createElement('li');
        li.innerHTML = `${newTaskDescription}  <button class='delete'>usuń</button>`;
        li.className = 'task';
        toDoList.push(li);
        // clear ul w DOM
        ulThingsToDo.innerText = '';
        // read li into ul in DOM, but this time from our array
        toDoList.forEach((li, index) => {
            li.id = index;
            ulThingsToDo.appendChild(li)
        })
        // searchbar is added with first li
        if (toDoList.length === 1) createSearchBar();
        numberOfThingsToDo.innerHTML = toDoList.length;
        deleteButtons[toDoList.length - 1].addEventListener('click', deleteTask);
        searchForInput[0].value = '';
    }
})

const createSearchBar = () => {
    const searchForInput = document.createElement('input');
    searchForInput.className = 'searchForInput';
    searchForInput.placeholder = 'szukaj';
    form.appendChild(searchForInput);
    searchForInput.addEventListener('input', searchForTask);
}


const searchForTask = function (e) {
    const textSearchedFor = e.target.value.toLowerCase();
    tasksActiveArr = toDoList.filter(elem => elem.textContent.toLowerCase().includes(textSearchedFor));
    ulThingsToDo.innerHTML = '';
    tasksActiveArr.forEach((task) => ulThingsToDo.appendChild(task));
    numberOfThingsToDo.textContent = tasksActiveArr.length
};


const deleteTask = (event) => {
    toDoList.splice(event.target.parentNode['id'], 1);
    ulThingsToDo.innerText = '';
    toDoList.forEach((li, index) => {
        li.id = index;
        ulThingsToDo.appendChild(li)
    })
    numberOfThingsToDo.innerHTML = toDoList.length;
    if (toDoList.length === 0) {
        searchForInput[0].remove();
    }
};