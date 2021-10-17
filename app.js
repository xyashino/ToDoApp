const express=require('express');
const {routerTasks} = require("./router/tasks");
const app=express();

app.use(express.static('public'));
app.use(express.json());
app.use('/tasks',routerTasks)

app.listen(3000);