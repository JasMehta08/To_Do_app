// this is the second version of the storage which i used to store the data so that it does not depend on the runtime storage


import { AppDataStorage } from "../db/config";
import { Task } from "../models/Task2";
import { Between } from "typeorm";

// this is the class for the task repository which is used to store the data in the database
export class TaskRepository {
    private repository = AppDataStorage.getRepository(Task);

    async findAll() : Promise<Task[]> {
        return await this.repository.find();
    }

    async findById(id : number) : Promise<Task | null> {
        try {
            console.log('Finding task with ID:', id);
            const task = await this.repository.findOneBy({ id });
            console.log('Found task:', task);
            return task;
        } catch (error) {
            console.error('Error in findById:', error);
            throw error;
        }
    }

    async findByName(name : string) : Promise<Task | null> {
        return  await this.repository.findOneBy({name});
    }

    async findPending() : Promise<Task[]>{
        return await this.repository.findBy({status : 'pending'});
    }

    async findByDueDate(date: string): Promise<Task[]> {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        return await this.repository.find({
            where: {
                dueDate: Between(startDate, endDate)
            }
        });
    }

    async create(task : Task) : Promise<Task> {
        return this.repository.save(task);
    } 

    async update(id: number, task: Partial<Task>): Promise<Task | null> {
        await this.repository.update(id, task);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}