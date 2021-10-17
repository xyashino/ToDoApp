import {BASIC_GET_PATH, getJson} from "./utils/network.js";
import {addTask, markAllElementsAsComplete, setFilter} from "./utils/listeners.js";
import {countItemLeft, refreshList,toggleVisibility} from "./utils/tools.js";


document.addEventListener('DOMContentLoaded',()=>{
    const inputToggle=document.querySelector('#toggle-all');
    const tasksList=document.querySelector('.todo-list');
    const inputAddTask=document.querySelector('.new-todo');
    const filters =document.querySelector('.filters');
    let tasksArr;

    (async()=>{
        tasksArr=await getJson(BASIC_GET_PATH)
        refreshList(tasksArr,tasksList);
        countItemLeft(tasksArr);
        toggleVisibility(tasksArr);
    })()


    filters.addEventListener('click',async event=>{await setFilter(event)});

    inputAddTask.addEventListener('keydown',async event => {await addTask(event,tasksArr)});

    inputToggle.addEventListener('change',(event)=>markAllElementsAsComplete(event,event.target.checked));
});







