import { CommentService } from './../../service/comment.service';
import { TokenStorageService } from './../../service/token-storage.service';
import { Router } from '@angular/router';
import { Todo } from './../../model/todo';
import { Comment } from '../../model/comment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private roles: string[] = [];
  private isLoggedIn = false;
  username?: string;
  userId: any;
  todos: Todo[] = [];
  todo?: Todo;
  editing: boolean = false;
  editingTodo: Todo = new Todo();
  newTodo: Todo = new Todo();

  public commentUpdate = new FormControl();
  public commentId: any;
  public tokenJWT: string;
  public todoId: any;
  public todoForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('')
  });
  newComment: Comment = new Comment();
  editingComment: Comment = new Comment();
  public comments: Comment[] = [];
  public commentForm = new FormGroup({
    id: new FormControl(''),
    content: new FormControl('')
  });
  srcResult: any;

  constructor(
    private commentService: CommentService,
    private tokenStorageService: TokenStorageService,
    private todoService: TodoService,
    private router: Router
  ) {
    this.userId = this.tokenStorageService.getUserId();
    this.tokenJWT = this.tokenStorageService.getToken();
  }

  get f() {
    return this.todoForm.controls;
  }

  ngOnInit() {

    this.getTodosByUser();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

    } else {
      this.router.navigate(['login']);
    }
  }

  getTodo(id: any) {
    this.todoService.getTodo(id).subscribe((data) => {
      this.todo = data.title;
    })
  }

  getTodosByUser() {
    this.todoService.getTodosByUser(this.userId).subscribe((data) => {
      this.todos = data;
    })
  }

  addTodo(): void {
    const { title } = this.todoForm.value;

    if (title === '') {
      return void (0);
    }
    const todo: any = {
      title: title

    }
    this.todoService.addTodo(this.userId, todo)
      .subscribe(addTodo => {
        this.todoForm.reset();
        this.getTodosByUser();
      });
  }

  deleteTodo(id: any): void {
    if (window.confirm('Are you sure want to delete this task?')) {
      this.todoService.deleteTodo(id)
        .subscribe(() => {
          this.todos = this.todos.filter(todo => todo?.id != id);
        });
    }
  }

  updateTodo(todoData: Todo): void {
    this.todoService.modifyTodo(todoData)
      .subscribe(updatedTodo => {
        const existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
        Object.assign(existingTodo, updatedTodo);
        this.clearEditing();
      });
  }

  toggleCompletedTodo(todoData: Todo): void {
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

  getAllCommentByTodo(id: any): void {
    this.commentService.getAllCommentByTodo(id).subscribe(data => {
      this.comments = data;
      this.todoId = id;
      this.getTodo(this.todoId);
    });
  }

  addComment(): void {

    const { content } = this.commentForm.value;

    if (content === '') {
      return void (0);
    }

    const comment: any = {
      todoId: this.todoId,
      content: content,
      user: {
        id: this.tokenStorageService.getUserId()
      }
    }

    this.commentService.addComment(this.todoId, comment).subscribe((result) => {
      this.commentForm.reset();
      this.getAllCommentByTodo(this.todoId);
    });
  }

  updateComment(commentData: Comment): void {
    this.commentService.modifyComment(commentData).subscribe(updatedComment => {
      this.commentService.getAllCommentByTodo(this.todoId).subscribe(data => {
        this.comments = data;
      });
      this.clearEditing();
    });
  }

  editComment(commentData: Comment): void {
    this.editing = true;
    Object.assign(this.editingComment, commentData);
  }

  clearEditingComment(): void {
    this.editingComment = new Comment();
    this.editing = false;
  }

  toggleCompletedComment(commentData: Comment): void {
    commentData.isEdit = !commentData.isEdit;
    this.commentService.modifyComment(commentData)
      .subscribe(updatedComment => {
        const existingComment = this.comments.find(comment => comment.commentId === updatedComment.id);
        Object.assign(existingComment, updatedComment);
      });
  }

  closeForm(id: any, closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentByTodo(id);
    this.commentUpdate.reset();
  }

  deleteComment(id: any) {
    if (window.confirm('Are you sure want to delete this comment?')) {
      this.commentService.deleteComment(id).subscribe(() => {
        this.comments = this.comments.filter(comment => comment.commentId != id);
      });
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
