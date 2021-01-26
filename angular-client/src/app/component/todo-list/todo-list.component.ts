import { Router } from '@angular/router';
import { Todo } from './../../model/todo';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoService,
    private router: Router) {
  }
  todoId = 0;
  todos: Todo[] = [];
  isSubmitted = false;
  selectedTodo?: Todo;
  public todoForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('')
  });

  get f() {
    return this.todoForm.controls;
  }

  @ViewChild("description") descriptionInput?: ElementRef;

  ngOnInit() {
    console.log(this.todoId)
    this.getTodo();
  }
  
  getTodo(){
    this.todoService.getTodo().subscribe((data) => {
      this.todos = data;
    });
  }

  createNewTodo() {
    const newTodo: any = {};
    for (const controlName in this.todoForm.controls) {
      if (controlName) {
        newTodo[controlName] = this.todoForm.controls[controlName].value;
      }
    }
    return newTodo as Todo;
  }

  public save() {

    if (this.selectedTodo) {
      this.todoService.modifyTodo(this.selectedTodo.id, this.createNewTodo()).subscribe((data) => {
        console.log(this.selectedTodo?.id)
        this.getTodo();
        this.router.navigate(['']);
        this.todoForm.reset();
      });
    } else {
      this.todoService.addTodo(this.createNewTodo()).subscribe((data) => {
        this.getTodo();
        this.router.navigate(['']);
        this.todoForm.reset();
      });
    }
  }

  selectTodo(todo: Todo) {
    this.selectedTodo = todo;
    this.selectedTodo.id = todo.id;
    console.log(this.selectedTodo.id)
    console.log(todo.id)
    this.todoForm.controls['id'].setValue(todo.id);
    this.todoForm.controls['description'].setValue(todo.description);
    this.descriptionInput?.nativeElement.focus();
  }

}
