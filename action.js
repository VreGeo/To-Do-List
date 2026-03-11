const newTask = document.getElementById("taskInput");
const addButton = document.getElementById("add_btn");
const taskList = document.getElementById("todoList");

function saveTasks() {
    const tasks = [];
    const items = document.querySelectorAll("#todoList li");

    items.forEach(function (li) {
        const label = li.querySelector("label");
        const checkbox = li.querySelector('input[type="checkbox"]');

        tasks.push({
            text: label.textContent,
            completed: checkbox.checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(text, completed = false) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const label = document.createElement("label");
    label.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-del";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    checkbox.addEventListener("change", function () {
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

addButton.addEventListener("click", function () {
    const text = newTask.value.trim();
    if (text === "") return;

    createTask(text);
    saveTasks();
    newTask.value = "";
});

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {
        createTask(task.text, task.completed);
    });
}

loadTasks();