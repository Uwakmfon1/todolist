const todoForm = document.querySelector("form");
const todoList = document.querySelector("#todoList");
const clearList = document.querySelector("#clearTodoList");
const todoStatus = document.querySelector("#todoStatus");

// getting the values of todolist as declared in line 29
let activitiesInStore = localStorage.getItem("todoList");

let ACTIVITIES_TODO = JSON.parse(activitiesInStore) || [];  //declaring variable and setting it to an array


function addItemToTodoList(event) {
  event.preventDefault();
// select the value of the form
  const newItemTodo = todoForm.todo.value;

  // triming the edges of the input to see if empty
  if (newItemTodo.trim() == "") {
    todoForm.reset();
    return;
  }
  
  // pushing the value given to the array
  ACTIVITIES_TODO.push({
    title: newItemTodo,
    isDone: false,
  });

// setting item of the todolist so as to get it in line 7
  localStorage.setItem("todoList", JSON.stringify(ACTIVITIES_TODO));  

  todoForm.reset(); // fires when the user resets a form

  refreshTodoList();    //refesh function defined down below
}


// function to remove todo item in list
function removeTodoItem(event) {
  const index = event.target.dataset.index; //we have targetted the individual item

  ACTIVITIES_TODO.splice(index, 1); //removes that element that was targetted

  localStorage.setItem("todoList", JSON.stringify(ACTIVITIES_TODO));  //u know this
  refreshTodoList();
}
  
// 
function changeTodoStatus(event) {  
  const index = event.target.dataset.index;

  // this 3 lines makes sure that it can be checked and unchecked
  ACTIVITIES_TODO.splice(index, 1, {
    title: ACTIVITIES_TODO[index].title,
    isDone: event.target.checked
  });

  localStorage.setItem("todoList", JSON.stringify(ACTIVITIES_TODO));
  refreshTodoList();
}



 function refreshTodoList() {
  if (ACTIVITIES_TODO.length == 0) return;

  todoList.innerHTML = "";
// this makes the input values to be stored to the screen
  const itemsInList = ACTIVITIES_TODO.length;
  const itemsDone = ACTIVITIES_TODO.filter((item) => item.isDone == true).length;


  if (itemsDone == itemsInList) {
    todoStatus.innerHTML = "🎉 All done!";
  } else {
    todoStatus.innerHTML = `Items: ${itemsInList} | Done: ${itemsDone}`;
  }

  ACTIVITIES_TODO.forEach((item, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.textContent = "Delete";
    button.dataset.index = index;
    
    button.addEventListener("click", removeTodoItem);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todo-item-" + index;
    checkbox.checked = item.isDone;
    checkbox.id = "todo-item-" + index;
    checkbox.dataset.index = index;

    checkbox.addEventListener("change", changeTodoStatus);
  
    if (item.isDone) {
      li.innerHTML = `<span>✅<S> ${item.title}<S> </span>`;
      li.classList.add("done");
    } else {
      li.innerHTML = `<span>🎯 ${item.title}</span>`;
    }

    li.appendChild(checkbox);
    li.appendChild(button);

    todoList.appendChild(li);
  });
}

function clearTodoList() {
  localStorage.removeItem("todoList");

  ACTIVITIES_TODO = [];
  todoList.innerHTML = "No items in todo list.";
}

todoForm.addEventListener("submit", addItemToTodoList);
clearList.addEventListener("click", clearTodoList);

refreshTodoList();