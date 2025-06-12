// these are the old routes which i used while i was running the app in the first version
// this is no longer being used in the app
// i am keeping it here for reference

import express from 'express'
import {ITask,Task} from '../models/Task'
import {TaskStorage} from '../storage/TaskStorage'

const route = express.Router();
const taskstore = new TaskStorage();

route.get('/tasks', (req,res)=>{
    try{
        res.json(taskstore.findAllTasks());
    }catch(error){
        res.status(500).json({ message: 'Server error', error });
    }
});

route.get('/tasks/id/:id',(req,res)=>{
    try{
        const task = taskstore.findTaskById(req.params.id);

        if(task){
            res.status(200).json(task);
        }else{
            res.status(404).json({message : 'task not found!'});
        }
    }catch(error){
        res.status(500).json({message : 'server error', error});
    }
});

route.get('/tasks/name/:name',(req,res)=>{
    try{
        const task = taskstore.findTaskByName(req.params.name);

        if(task){
            res.status(200).json(task);
        }else{
            res.status(404).json({message : 'task not found!'});
        }
    }catch(error){
        res.status(500).json({message : 'server error', error});
    }
});

route.get('/tasks/pending',(req,res)=>{
    try{
        res.json(taskstore.findPendingTasks());
    }catch(error){
        res.status(500).json({ message: 'Server error', error });
    }
});

route.get('/tasks/date/:date',(req,res)=>{
    try{
        const date = new Date(req.params.date);
    if(isNaN(date.getTime())) res.status(404).json({message : 'incorrect date'});
    res.json(taskstore.findTasksBydueDate(date));
    }catch(error){
        res.status(500).json({message : 'server error', error});
    }
});

route.put('/tasks/update/:id',(req,res)=>{
    try{
        const updatedtask = taskstore.updateTask(req.params.id,req.body);
        if(!updatedtask) res.status(404).json({message:'task not found'});
        res.json(updatedtask);
    }catch(error){
        res.status(500).json({message : 'server error', error});
    }
});

route.post('/tasks/new',(req,res)=>{
    try{
        const {name , description , dueDate , status} = req.body;
        if(!name||!dueDate) res.status(400).json({message : 'name or duedate not given'});
        const task = new Task(name,new Date(dueDate),description,status);
        taskstore.addTask(task);
        res.json(task); 
    }catch(error){
        res.status(500).json({message : 'server error', error});
    }
});

route.delete('/tasks/delete/:id',(req,res)=>{
    try{
        if(taskstore.deleteTask(req.params.id.toString())){
            res.status(204).send();
        }
        else{
            res.status(404).json({message : 'task not found'});
        }
    }catch(error){
        res.status(500).json({message : 'server error', error});
    }
});

export default route;