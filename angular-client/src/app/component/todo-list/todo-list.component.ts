import { CommentService } from './../../service/comment.service';
import { TokenStorageService } from './../../service/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showModeratorUser = false;
  username?: string;
  userId?: string;
  todos: Todo[] = [];
  editing: boolean = false;
  editingTodo: Todo = new Todo();
  newTodo: Todo = new Todo();
  public comment?: Comment;
  public comments: Comment[] = [];
  public commentForm = new FormGroup({
    content: new FormControl('')
  });
  public commentUpdate = new FormControl();
  public commentId: any;
  public tokenJWT: string;
  public todoId: any;
  public todoForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [Validators.required])
  });

  constructor(
    private commentService: CommentService,
    private tokenStorageService: TokenStorageService,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userId = this.tokenStorageService.getUserId();
    this.tokenJWT = this.tokenStorageService.getToken();
  }

  get f() {
    return this.todoForm.controls;
  }

  @ViewChild("description") descriptionInput?: ElementRef;

  ngOnInit() {

    this.getTodosByUser();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    } else {
      this.router.navigate(['login']);
    }
  }

  getTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  getTodosByUser() {
    this.todoService.getTodosByUser(this.userId).subscribe((data) => {
      this.todos = data;
    })
  }

  createTodo(todoForm: NgForm): void {
    this.todoService.addTodo(this.userId, this.newTodo)
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

  getAllCommentByTodo(id: any): void {
    this.commentService.getAllCommentByTodo(id).subscribe(data => {
      this.comments = data;
      this.todoId = id;
    });
  }

  addComment(id: any) {

    const { content } = this.commentForm.value;

    if (content === '') {
      return;
    }

    const comment: any = {
      todiId: this.todoId,
      content: content,
      user: {
        id: this.tokenStorageService.getUserId()
      }
    }

    console.log(this.todoId)
    this.commentService.addComment(this.todoId, comment).subscribe((result) => {
      this.getAllCommentByTodo(id);
      this.commentForm.reset();
    })
  }

  updateComment(commentId: number, closeModalRef: HTMLAnchorElement) {

    if (this.commentUpdate.value == null) {
      return this.closeForm(this.todoId, closeModalRef);
    }

    const comment: any = {
      commentId: commentId,
      content: this.commentUpdate.value
    };

    this.commentService.modifyComment(comment).subscribe(result => {
      this.closeForm(this.todoId, closeModalRef);
    }, error => {
      console.log(error);
    });
  }

  // getComment() {
  //   this.commentService.getComment(this.commentId).subscribe((data) => {

  //     this.comment = data;
  //     console.log(this.commentId);
  //   });
  // }

  getCommentId(id: number) {
    this.commentId = id;
  }

  closeForm(id: any, closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentByTodo(id);
    this.commentUpdate.reset();
  }

  deleteComment(id: any, closeModalRef2: HTMLButtonElement) {
    this.commentService.deleteComment(id).subscribe(result => {
      this.comments = this.comments.filter(comment => comment.commentId != id);
      this.getAllCommentByTodo(id);
    }, error => {
      console.log(error);
    });
  }
}
