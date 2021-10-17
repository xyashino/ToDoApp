import {getJson, sendJson, BASIC_SET_PATH, BASIC_GET_PATH} from "./network.js";
import {countItemLeft, createTaskObj, refreshList, removeStyle, toggleVisibility} from "./tools.js";

const tasksList=document.querySelector('.todo-list');
const inputAddTask=document.querySelector('.new-todo');



const changeValue=async (e,label,input,li)=>{
    if(e.keyCode===13){
        const tasks =await getJson(BASIC_GET_PATH);
        label.textContent=input.value;
        const id =Number(li.dataset.id);
        tasks.forEach(obj=>{
            if(obj['id']===id){
                obj.value=input.value;
            }
        });
        li.classList.remove('editing');
        await sendJson(tasks,BASIC_SET_PATH);
    }
}






const addTask=async (event) =>
{
    if(event.keyCode===13){
        const arrTasks=await getJson(BASIC_GET_PATH);
        if(!inputAddTask.value){return}
        const length=arrTasks.length;
        const id=!length ? 1 : arrTasks[length-1].id + 1;
        createTaskObj(inputAddTask.value,id,arrTasks);
        inputAddTask.value='';
        await sendJson(arrTasks,BASIC_SET_PATH);
        countItemLeft(arrTasks);
        toggleVisibility(arrTasks);


    }
}


const removeTask =async (element) => {
    const data =await getJson(BASIC_GET_PATH);
    const id=element.target.getAttribute('data-id');
    const task=document.querySelector(`li[data-id="${id}"]`);
    task.remove();
   let indexArr;
    data.forEach((el,index)=>{
        if(el['id']===Number(id)){
            return indexArr=index;
        }
   })
    data.splice(indexArr,1);
    await sendJson(data,BASIC_SET_PATH);
    countItemLeft(data);
    toggleVisibility(data);
}



const editTask=(label,li,inputEdit)=>{
    li.classList.add('editing');
    inputEdit.addEventListener('keydown',async (e)=>{await changeValue(e,label,inputEdit,li)})
}


const clearCompletedTasks=async (element) =>
{
    const data =await getJson(BASIC_GET_PATH);
    const arrNotCompleteTask=[];
    data.forEach(el=>{
        if(!el['completed']){
            arrNotCompleteTask.push(el);
        }
    })
    element.style.display='none';
    ;
    await sendJson(arrNotCompleteTask,BASIC_SET_PATH);
    refreshList(arrNotCompleteTask,tasksList);
}




const markElementAsComplete=async (element)=>{
    const id=Number(element.target.dataset.id);
    const tasks =await getJson(BASIC_GET_PATH);
    tasks.forEach(obj=>{
            if(obj['id']===id){
                obj.active=obj.completed;
                obj.completed=!obj.completed;
            }
        });
    await sendJson(tasks,BASIC_SET_PATH);
    countItemLeft(tasks);
    tasksList.textContent='';
    refreshList(tasks,tasksList);
};



const markAllElementsAsComplete=async (element,bool)=>{
    const tasks =await getJson(BASIC_GET_PATH);
    tasks.forEach(obj=>{
        obj.completed=bool;
        obj.active=!bool;
        }
    );
    await sendJson(tasks,BASIC_SET_PATH);
    countItemLeft(tasks);
    tasksList.textContent='';
    refreshList(tasks,tasksList);
};



const setFilter=async (e)=> {
    removeStyle('selected');
    e.target.classList.add('selected');
    const arr = await getJson(e.target.dataset.path);
    refreshList(arr, tasksList);
    countItemLeft(arr);
}
export{
    editTask,
    addTask,
    removeTask,
    clearCompletedTasks,
    markElementAsComplete,
    markAllElementsAsComplete,
    setFilter
}