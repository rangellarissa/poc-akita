import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { ToDo } from "./todo.model";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    private readonly baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    addToDo(title: string, description: string): Observable<ToDo> {
        return this.http.post<ToDo>(this.baseUrl, { title, description });
    }

    getToDos():Observable<ToDo[]>{
        return this.http.get<{data:ToDo[]}>(this.baseUrl).pipe(
            map((res: {data:ToDo[]}) => {
                return res.data;
            })
        )
    }

    deleteToDo(id:string):Observable<ToDo> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    updateToDo(id: string, changes: any) {
        return this.http.put(`${this.baseUrl}/${id}`, changes);
    }

}