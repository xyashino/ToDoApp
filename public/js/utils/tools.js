import {Task} from "./task.js";
import {clearCompletedTasks} from "./listeners.js";



const tasksList=document.querySelector('.todo-list');

const countItemLeft=(arr)=>{
    let number=0;
    for (const obj of arr) {
        if(!obj['completed']){
            number++;
        }
    }
    document.querySelector('.todo-count strong').textContent=number+'';



    const btnClearCompleted=document.querySelector('.clear-completed');
    btnClearCompleted.addEventListener('click',async (e)=>{await clearCompletedTasks(e.target)});

    if(!arr.length || number===arr.length){
        btnClearCompleted.style.display='none';
        return
    }

    btnClearCompleted.style.display='block';
}


const refreshList=(arr,motherElement)=>{

    motherElement.textContent='';

    for (const obj of arr) {
        const task=new Task(obj);
        task.create(motherElement);
    }
}



const createTaskObj=(value, id,arr)=>{
    let taskObj={
        id,
        value,
        active:true,
        completed:false
    };
    const task=new Task(taskObj);
    task.create(tasksList);
    arr.push(taskObj);
}



const toggleVisibility=(arr)=>{
    const main=document.querySelector('.main');
    const footer=document.querySelector('.footer');
    if(!(arr.length)){
        main.style.display='none';
        footer.style.display='none';
        return;
    }
    main.style.display='block';
    footer.style.display='block';}


const removeStyle=(className)=>{
    const arr =document.querySelectorAll('.filters a');
    arr.forEach(el=> {
        el.classList.remove(className)
    });
}

export {
    createTaskObj,
    countItemLeft,
    refreshList,
    toggleVisibility,
    removeStyle
}