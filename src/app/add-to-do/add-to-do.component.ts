import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToDoQuery } from '../state/query';
import { ToDoStore } from '../state/store';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.scss']
})
export class AddToDoComponent implements OnInit {

  form!: FormGroup;

  constructor(private apiService: ApiService, private toDoStore: ToDoStore, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  }

  addToDo() {
    console.log(this.form.value);
    this.toDoStore.setLoading(true);
    this.apiService.addToDo(this.form.controls.title.value,
      this.form.controls.description.value).subscribe(res => {
      this.toDoStore.update(state => {
          return {
            toDos : [
              ...state.toDos,
              res
            ]
          };
      });
      this.toDoStore.setLoading(false);
      this.router.navigateByUrl('');
    });
  }

}
