// this is the configuration for the database i am using postgres

import { DataSource } from "typeorm"; // this is the typeorm library for the database which is used to connect to the database
import { Task } from "../models/Task2"; // this is the model for the task which is used to store the data in the database
import dotenv  from 'dotenv'; // this is the dotenv library which is used to store the environment variables in the database

// this is the configuration for the database i am using postgres
dotenv.config();

export const AppDataStorage =  new DataSource({
    type : "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    entities: [Task],
    synchronize: true,
});
