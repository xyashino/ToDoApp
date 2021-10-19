const express=require('express');
const {writeFile,readFile}=require('fs').promises;

const routerTasks=express.Router();


routerTasks
    .get('/', async (req, res) =>{
    const data=await readFile('./data/data_tasks.json','utf8');
    res.json(data);
    })

    .post('/save', async (req, res) => {
        const tasks= req.body;
        await writeFile('./data/data_tasks.json',JSON.stringify(tasks));
        res.end();
    })
    .get('/:value', async (req, res) =>{
        const data=await readFile('./data/data_tasks.json','utf8');
        const arrWithoutValue=[];
        JSON.parse(data).forEach(el=>
        {
            if(el[req.params.value]) arrWithoutValue.push(el)
        })
        res.json(JSON.stringify(arrWithoutValue));
    });



module.exports = {
    routerTasks
}
