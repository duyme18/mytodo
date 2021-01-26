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
    description: new FormControl('')
  });

  get f() {
    return this.todoForm.controls;
  }

  @ViewChild("description") descriptionInput?: ElementRef;

  ngOnInit() {
    this.todoService.getTodo().subscribe((data) => {
      this.todos = data;
      console.log(this.todos);
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
    this.isSubmitted = true;
    if (this.todoForm.invalid) {
      return;
    }
    if (this.selectedTodo) {
      this.todoService.modifyTodo(this.createNewTodo()).subscribe((data) => {
        this.router.navigate(['']);
        this.todoForm.reset();
      });
    } else {
      this.todoService.addTodo(this.createNewTodo()).subscribe((data) => {
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
    this.todoForm.controls['description'].setValue(todo.description);
    this.descriptionInput?.nativeElement.focus();
  }

}
