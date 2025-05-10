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