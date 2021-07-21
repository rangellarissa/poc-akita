import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { ToDo } from "../todo.model";
import { ToDoState, ToDoStore } from "./store";

@Injectable({ providedIn: 'root' })
export class ToDoQuery extends Query<ToDoState> {
    constructor(private toDoStore: ToDoStore){
        super(toDoStore);
    }

    getToDos(): Observable<ToDo[]> {
        return this.select(state => state.toDos);
    }

    getLoaded(): Observable<boolean> {
        return this.select(state => state.isLoaded);
    }

    getIsLoading(): Observable<boolean> {
        return this.selectLoading();
    }

}