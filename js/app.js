//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
//UNORDERED LIST
const todoList = document.querySelector(".todo-list");
//SELECT
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //Prevents Form from Submitting!
    event.preventDefault();

    //Create TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add todo to LocalStorage
    saveLocalTodos(todoInput.value);

    //Create Completed BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //For Empty input value disable Add Button
    if (todoInput.value == "") {
      alert(`This field can't be empty. Please add something`);
      return false;
    } 
    
    // Clear Todo Input Value when new Item is added!
    todoInput.value = "";
    // Appending Above to VAR TodoList
    todoList.appendChild(todoDiv);
  }

  function deleteTodo(event) {
    const item = event.target;
    //Delete Todo
    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
          todo.remove();
        });
      }
    //Check Mark
    if (item.classList[0] === "complete-btn") {
      const todo  = item.parentElement;
      todo.classList.toggle("completed");
      console.log(todo);
    }
  }

  function filterTodo(event) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
      switch (event.target.value) {
        case "all":
        todo.style.display = "flex";
        break;
        case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
        case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      }
    });
  }

  function saveLocalTodos(todo) {
  //Check if we have items present in the local Storage Already.
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach( (todo) => {
        //Create TODO DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Create Completed BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Create TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        // Appending Above to VAR TodoList
        todoList.appendChild(todoDiv);
      });
}

function removeLocalTodos(todo) {
  //Check if we have items present in the local Storage Already.
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //Saving the root adress of the deleted array element
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

