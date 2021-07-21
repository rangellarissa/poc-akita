import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { ToDo } from "../todo.model";

export interface ToDoState{
    toDos: ToDo[],
    isLoaded: boolean,
}

export const getInitialState = () => {
    return {
        toDos: [],
        isLoaded: false,
    };
};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({name: 'todo'})
export class ToDoStore extends Store<ToDoState> {
    constructor(){
        super(getInitialState());
    }
}