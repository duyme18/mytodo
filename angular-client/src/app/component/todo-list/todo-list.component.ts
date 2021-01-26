import { Router } from '@angular/router';
import { Todo } from './../../model/todo';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  todos: Todo[] = [];
  editing: boolean = false;
  editingTodo: Todo = new Todo();
  newTodo: Todo = new Todo();

  public todoForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [Validators.required])
  });

  get f() {
    return this.todoForm.controls;
  }

  @ViewChild("description") descriptionInput?: ElementRef;

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  createTodo(todoForm: NgForm): void {
    this.todoService.addTodo(this.newTodo)
      .subscribe(createTodo => {
        todoForm.reset();
        this.newTodo = new Todo();
        this.todos.unshift(createTodo)
      });
  }

  deleteTodo(id: any): void {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo?.id != id);
      });
  }

  updateTodo(todoData: Todo): void {
    console.log(todoData);
    this.todoService.modifyTodo(todoData)
      .subscribe(updatedTodo => {
        const existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
        Object.assign(existingTodo, updatedTodo);
        this.clearEditing();
      });
  }

  toggleCompleted(todoData: Todo): void {
    todoData.completed = !todoData.completed;
    this.todoService.modifyTodo(todoData)
      .subscribe(updatedTodo => {
        const existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
        Object.assign(existingTodo, updatedTodo);
      });
  }

  editTodo(todoData: Todo): void {
    this.editing = true;
    Object.assign(this.editingTodo, todoData);
  }

  clearEditing(): void {
    this.editingTodo = new Todo();
    this.editing = false;
  }

}
