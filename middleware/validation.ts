// this is the validation middleware which is used to validate the data before it is stored in the database

import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Task } from '../models/Task2';

export const validateTask = async (req: Request, res: Response, next: NextFunction) => {
    const task = plainToInstance(Task, req.body);
    const errors = await validate(task);
    
    if (errors.length > 0) {
        res.status(400).json({ 
            message: 'Validation failed', 
            errors: errors.map(error => {
                return {
                    property: error.property,
                    constraints: error.constraints
                };
            })
        });
    }
    
    next();
};
