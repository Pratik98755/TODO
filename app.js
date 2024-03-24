import render from "./render.js"
import store from "./store.js"

import { add_todo , delete_todo , toggle_completed} from "./store.js";


window.addEventListener("todos_change",()=>{
    console.log("todos_change_fire")
    render();                      // render when todos array changed
})

// try to get store from browser's local storage 
const store_from_local_storage = JSON.parse(localStorage.getItem("store"))
// check if store todos exist with some length(data)
if (store_from_local_storage?.todos.length > 0){
    store.todos = store_from_local_storage.todos;
}else{
    render();
}
// console.log(store_from_local_storage);


// render();                                            //initial render

const form = document.querySelector("#form");
const todo_title_input = document.querySelector(".todo_title_input");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const todo_title = todo_title_input.value;
    const new_todo = {id:crypto.randomUUID() , title:todo_title , completed: false}
    add_todo(new_todo);
})


const todos = document.querySelector(".todos");
todos.addEventListener("click",(e)=>{
    console.log(e)
    if(e.target.classList.contains("delete-todo-button")){
        console.log("clicked on cross")
        const li = e.target.closest(".todo").dataset.id;
        console.log(li);
        delete_todo(li);
    }
})



// checkbox parr "check" event lagaya jaaata h
todos.addEventListener("change",(e)=>{
    if(e.target.classList.contains("todo-checkbox")){
        const id = e.target.closest(".todo").dataset.id;
        console.log(id);
        const completed = e.target.checked;
        toggle_completed(id , completed);
    }
})
