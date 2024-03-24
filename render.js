import store from "./store.js"

function render(){
    const todos = document.querySelector(".todos");

    const todo_elements = store.todos.map((todo)=>
        `<li data-id=${todo.id} class="todo">
        <span class="todo-title ${todo.completed? "completed" : "" }"> ${todo.title} </span>
        <div class="toggle-delete">
            <input type="checkbox" name="completed" class="todo-checkbox" ${todo.completed? "checked" : ""}>
            <button class="delete-todo-button">x</button>
        </div>
    </li>`
    ).join("");                          // converts array into string

    console.log(todo_elements);
    todos.innerHTML = todo_elements;

}

export default render;