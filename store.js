const store = {
    todos : [
        {
            id : "1",
            title : "Task Z",
            completed : false
        },
        {
            id : "2",
            title : "Task Y",
            completed : true
        },
        {
            id : "3",
            title : "Task X",
            completed : true
        }
    ]
}






const store_handler = {
    get(target,property){
        console.log(property);
        return target[property];
    },
    set(target,property,value){
        console.log(target,property,value)
        target[property] = value;

        if(property == "todos"){
            window.dispatchEvent(new Event("todos_change"));

            //saving data to browser's local storage
            localStorage.setItem("store",JSON.stringify(store));
            return true;
        }
    }
}

const store_proxy = new Proxy(store,store_handler);
// proxy only work with objects






function add_todo(newtodo){
    store_proxy.todos = [...store_proxy.todos,newtodo];
}
function delete_todo(id){
    // filter gives a new array
    // store_proxy.todos = store_proxy.todos.filter(todo => todo.id !== id)
    store_proxy.todos = store_proxy.todos.filter((todo)=>{
        if(todo.id !== id){
            return todo;
        }
    })
}
function toggle_completed (id , completed){
    store_proxy.todos = store_proxy.todos.map((todo) => {
        if(todo.id === id){
            return {...todo , completed : completed};
        }else{
            return todo;
        }
    })
}



export default store_proxy;
export {add_todo , delete_todo , toggle_completed};