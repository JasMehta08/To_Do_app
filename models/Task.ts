// this is no longer being used this was my first attempt at making the app using only typesript


export interface ITask {
    id: string | number;
    name: string;
    description: string;
    dueDate: Date;
    status: string;
}

export class Task implements ITask {
    id: string | number;
    name: string;
    description: string;
    dueDate: Date;
    status: string;

    constructor(
        name: string,
        dueDate: Date,
        description: string = '-',
        status: string = 'pending'
    ) {
        this.id = Date.now().toString(); 
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}