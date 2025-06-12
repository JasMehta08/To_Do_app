// these are the routes for the database which is used to store the data in the database

import express from 'express';
import { Task } from "../models/Task2";
import { TaskRepository } from "../storage/dbstorage";
import { validateTask } from '../middleware/validation';

export const router = express.Router();
const taskRepository = new TaskRepository();

// this is the route for the tasks which is used to get all the tasks from the database
router.get('/tasks' , async (req,res)=>{
    try{
        const tasks = await taskRepository.findAll();
        res.json(tasks);
    }catch(error){
        res.status(500).json({message : 'server error',error});
    }
});

// this is the route for the tasks which is used to get a task by id from the database
router.get('/tasks/id/:id' , async (req,res)=>{
    try{
        const task = await taskRepository.findById(Number(req.params.id));
        if(task){
            res.json(task);
        }else{
            res.status(404).json({message : 'task not found'});
        }
    }catch(error){
        res.status(500).json({message : 'server error',error});
    }
});

// this is the route for the tasks which is used to get a task by name from the database
router.get('/tasks/name/:name' , async (req,res)=>{
    try{
        const task = await taskRepository.findByName(String(req.params.name));
        if(task){
            res.json(task);
        }else{
            res.status(404).json({message : 'task not found'});
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({message : 'server error', error});
    }
});

// this is the route for the tasks which is used to get a task by due date from the database
router.get('/tasks/duedate/:duedate' , async (req,res)=>{
    try{
        const date = new Date(req.params.duedate);
        if (isNaN(date.getTime())) {
            res.status(400).json({message: 'Invalid date format'});
            return;
        }
        const task = await taskRepository.findByDueDate(req.params.duedate);
        if(task){
            res.json(task);
        }else{
            res.status(404).json({message : 'No tasks found for this date'});
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({message : 'server error', error});
    }
});

// this is the route for the tasks which is used to get all the pending tasks from the database
router.get('/tasks/Pending' , async (req,res)=>{
    try{
        const tasks = await taskRepository.findPending();
        if(tasks && tasks.length > 0){
            res.json(tasks);
        }else{
            res.status(404).json({message : 'No pending tasks found'});
        }
    }catch(error){
        res.status(500).json({message : 'server error',error});
    }
});

// this is the route for the tasks which is used to create a new task in the database
router.post('/tasks/new', validateTask, async(req,res)=>{
    try{
        const {name,description,dueDate,status} = req.body;

        if (!Date.parse(dueDate)) {
            res.status(400).json({message: 'Invalid date format'});
            return;
        }

        const task = new Task(
            name,
            new Date(dueDate),
            description,
            status
        );
        
        if(name && dueDate){
            const savedTask = await taskRepository.create(task);
            res.status(201).json(savedTask);
        }else{
            res.status(400).json({message : 'name or date not given'})
        }    
    }catch(error){
        res.status(500).json({message : 'server error',error});
    }
});

// this is the route for the tasks which is used to update a task in the database
router.put('/tasks/update/:id', validateTask, async(req,res)=>{
    try{
        const {name,description,dueDate,status} = req.body;

        const parsedDueDate =  new Date(dueDate);
        if (isNaN(parsedDueDate.getTime())) {
            res.status(400).json({message: 'Invalid date format'});
            return;
        }

        const existingTask = await taskRepository.findById(Number(req.params.id));
        if (!existingTask) {
            res.status(404).json({message: 'task not found'});
            return;
        }
        
        const task = new Task(
            name,
            new Date(dueDate),
            description,
            status
        );

        if(name && dueDate){
            const updatedTask = await taskRepository.update(Number(req.params.id),task);
            res.json(updatedTask);
        }
        else{
            res.status(404).json({message : 'task not found'});
        }
    }catch(error){
        res.status(500).json({message : 'server error',error});
    }
})

// this is the route for the tasks which is used to delete a task from the database
router.delete('/tasks/delete/:id',async(req,res)=>{
    try{
        const deletedTask = await taskRepository.delete(Number(req.params.id));
        if(deletedTask) res.json(deletedTask);
        else{
            res.status(404).json({message : 'task not found'});
        }
    }catch(error){
        res.status(500).json({message : 'server error',error});
    }
})