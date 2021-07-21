export interface ToDo {
    _id?: any;
    title?: string;
    description?: string;
    status?: ToDoStatus;
}

export enum ToDoStatus {
    OPEN = 'open',
    DONE = 'done'
}