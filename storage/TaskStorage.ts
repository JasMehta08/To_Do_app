// this is runtime storage which i used while i was running the app in the first version
// this is no longer being used in the app
// i am keeping it here for reference

import  { ITask } from '../models/Task';

export class TaskStorage {
    private tasks = new Map<string|number,ITask>();
    private tasksname = new Map<string , string|number>();

    //add task
    addTask(task : ITask):ITask{
        this.tasks.set(task.id,task);
        this.tasksname.set(task.name.toLowerCase(),task.id.toString());
        return task;
    }
    //display all tasks
    findAllTasks():ITask[]|undefined{
        return Array.from(this.tasks.values());
    }
    //display all tasks pending
    findPendingTasks():ITask[] | undefined{

        return Array.from(this.tasks.values())
            .filter(task => task.status === 'pending');
    }
    //search by name
    findTaskByName(name : string):ITask | undefined{
        const id = this.tasksname.get(name.toLowerCase());
        return id ? this.tasks.get(id.toString()):undefined;
    }
    //search by id
    findTaskById(id : string|number):ITask | undefined{
        return this.tasks.get(id);
    }
    //display all tasks for a particular due date
    findTasksBydueDate(date:Date) : ITask[]|undefined{
        const searchdate = new Date(date).toDateString();

        return Array.from(this.tasks.values())
            .filter(task => new Date(task.dueDate).toDateString() === searchdate);
    }
    //update task
    updateTask(id : string | number , updates:Partial<ITask>) : ITask | undefined{
        const existingtask = this.tasks.get(id);
        if(!existingtask) return undefined;

        const updatedtask = {
            ...existingtask,
            ...updates
        }

        if(updates.name && updates.name !== existingtask.name){
            this.tasksname.delete(existingtask.name.toLowerCase());
            this.tasksname.set(updates.name.toLowerCase(),id);
        }

        this.tasks.set(id,updatedtask);
        return updatedtask;
    }
    //delete task
    deleteTask(id : string|number): boolean{
        const task = this.tasks.get(id);
        if(task){
            this.tasksname.delete(task.name.toLowerCase());
            return this.tasks.delete(id);
        }
        return false;
    }
}