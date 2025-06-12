// this is the model for the task which is used to store the data in the database in posgresql

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsIn, Length, IsNotEmpty } from 'class-validator';

@Entity('Task')  // Explicitly name the table
export class Task {
    @PrimaryGeneratedColumn()  // Auto-incrementing primary key
    id!: number;  // Keep this public for TypeORM

    @Column() 
    @IsString()
    @IsNotEmpty()
    @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
    name!: string;  // Keep this public for TypeORM

    @Column({ default: '-' }) 
    @IsString()
    @Length(0, 500, { message: 'Description must be less than 500 characters' }) 
    description!: string;  // Keep this public for TypeORM

    @Column()
    @IsNotEmpty()
    dueDate!: Date;  // Keep this public for TypeORM

    @Column({ default: 'pending' })
    @IsString()
    @IsIn(['pending', 'completed', 'in-progress'], { 
        message: 'Status must be either pending, completed, or in-progress' 
    })
    status!: string;  // Keep this public for TypeORM

    constructor(name: string, dueDate: Date, description: string = '-', status: string = 'pending') {
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.status = status;
    }
}