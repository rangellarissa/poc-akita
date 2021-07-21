import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filter, switchMap, take } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { ToDoQuery } from '../state/query';
import { ToDoStore } from '../state/store';
import { ToDo, ToDoStatus } from '../todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  toDos: ToDo[] = [];

  constructor(
    private router: Router, 
    private toDoQuery: ToDoQuery, 
    private toDoStore: ToDoStore,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.toDoQuery.getIsLoading().subscribe(res => this.loading = res);
    this.toDoQuery.getToDos().subscribe(res => this.toDos = res);
    this.toDoQuery.getLoaded().pipe(
      take(1),
      filter(res => !res),
      switchMap(() => {
        this.toDoStore.setLoading(true);
        return this.apiService.getToDos();
      })
    ).subscribe(res => {
      this.toDoStore.update(state => {
        return {
          toDos: res,
          isLoaded: true,
        };
      });
      this.toDoStore.setLoading(false);

    }, err => {
      console.log(err);
      this.toDoStore.setLoading(false);
    });
  }

  addToDo() {
    this.router.navigateByUrl('/add-to-do');
  }

  markAsComplete(id:string) {
    this.apiService.updateToDo(id, {status:ToDoStatus.DONE}).subscribe(res => {
      this.toDoStore.update(state => {
        const toDos = [...state.toDos];
        const index = toDos.findIndex(t => t._id === id);
        toDos[index] = {
          ...toDos[index],
          status: ToDoStatus.DONE
        };
        return {
          ...state, 
          toDos
        }
      })
    }, err => console.log(err));
  }

  deleteToDo(id:string) {
    this.apiService.deleteToDo(id).subscribe(res => {
      this.toDoStore.update(state => {
        return {
          ...state,
          toDos: state.toDos.filter(t => t._id !== id)
        }
      });
    }, error => console.log(error));
  }
}
