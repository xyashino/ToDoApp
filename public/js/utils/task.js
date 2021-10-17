import {editTask,markElementAsComplete,removeTask} from "./listeners.js";

class Task{
    constructor(obj) {
        this.properties=obj;
    }

    addListeners(inputToggle,label,btn,li,inputEdit){
        inputToggle.addEventListener('change',async e=>{await markElementAsComplete(e)});
        label.addEventListener('dblclick',()=>{editTask(label,li,inputEdit)});
        btn.addEventListener('click',async (el)=>{await removeTask(el)});

    }
    createDOMElementWithClass(el,className=false){
        const element=document.createElement(el);
        if(!className){
            return element;
        }
        element.classList.add(className);
        return element;
    }
    create(motherElement){
        //create Elements and add class
        const li=this.createDOMElementWithClass('li');
        const div=this.createDOMElementWithClass('div','view');
        const inputToggle=this.createDOMElementWithClass('input','toggle');
        const label=this.createDOMElementWithClass('label');
        const btn=this.createDOMElementWithClass('button','destroy');
        const inputEdit=this.createDOMElementWithClass('input','edit');

        //add attributes

        if(this.properties['completed']){
            inputToggle.checked=true;
            li.classList.add('completed');
        }
        li.setAttribute('data-id',this.properties['id']);
        inputToggle.setAttribute('type','checkbox');
        inputToggle.setAttribute('data-id',this.properties['id']);
        inputEdit.setAttribute('value',`${this.properties['value']}`);
        btn.setAttribute('data-id',this.properties['id']);

        label.textContent=this.properties['value'];

        //add elements
        div.appendChild(inputToggle);
        div.appendChild(label);
        div.appendChild(btn);

        li.appendChild(div);
        li.appendChild(inputEdit);
        motherElement.appendChild(li);
        this.addListeners(inputToggle,label,btn,li,inputEdit);
    }




}

export {Task}