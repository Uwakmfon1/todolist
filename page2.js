const form = document.querySelector("form");
const todolist = document.querySelector("#todolist");
const cleartodolist  = document.querySelector("#clearTodoList");
const todostatus  = document.querySelector("#todostatus");


let activitiesInStore = localStorage.getItem("todolist");
let ACTIVITIES_TODO = JSON.parse(activitiesInStore) || []

function addItemTodoList(event){
    event.preventDefault();

    const newItemTodo = form.todo.value

    if(newItemTodo.trim() == ""){
        form.reset();
        return;
    }

    ACTIVITIES_TODO.push({
        title:newItemTodo,
        isDone:false
    })

    localStorage.setItem("todolist", JSON.stringify(ACTIVITIES_TODO));
    
    refreshToDoList()
}

function removeTodoItem(event){
    const index = event.target.dataset.index;
    ACTIVITIES_TODO.splice(index,1);
    localStorage.setItem("todolist", JSON.stringify(ACTIVITIES_TODO));

    refreshToDoList()
}



function refreshToDoList(){
if(ACTIVITIES_TODO.length == 0) return;

todolist.innerHTML = "";

const itemsInList =ACTIVITIES_TODO.length;
const itemsDone = ACTIVITIES_TODO.filter(
    (item) => item.isDone == true
).length;

if(itemsDone == itemsInList){
    todostatus.innerHTML = "All done!"
}else{
    todostatus.innerHTML =`items:${itemsInList} | Done: ${itemsDone}`;
}

ACTIVITIES_TODO.forEach((item, index) =>{
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.textContent = "Delete";
    button.dataset.index = index;

    button.addEventListener("click", removeTodoItem);
    
    const  checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todo-item-" + index;
    checkbox.checked = item.isDone;
    checkbox.id = "todo-item-" + index;
    checkbox.dataset.index = index;

    checkbox.addEventListener("change", changeTodoStatus);

    if(item.isDone){
        li.innerHTML =`<span> ${item.title} </span>`;
        li.classList.add("done");
    }else{
        li.innerHTML =`<span> ${item.title} </san>`;
    }

    li.appendChild(checkbox);
    li.appendChild(button);

    todolist.appendChild(li);
})
}

function clearTodoList(){
    localStorage.removeItem("todolist");

    ACTIVITIES_TODO =[];
    todolist.innerHTML = "No items in todo list";
}

todoForm.addEventListener("submit", addItemTodoList);
clearList.addEventListener("click", clearTodoList);

refreshTodoList();