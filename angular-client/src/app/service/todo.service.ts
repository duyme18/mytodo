import { Todo } from './../model/todo';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  }

  private apiURL = 'http://localhost:8080/api/auth/todo';

  constructor(private httpClient: HttpClient) { }

  getTodo() {
    const URL = `${this.apiURL}`;
    return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addTodo(todo: Todo) {
    const URL = `${this.apiURL}`;
    return this.httpClient.post<any>(URL, todo, this.httpOptions).pipe(catchError(this.handleError));
  }

  public modifyTodo(todo: Todo) {
    const URL = `${this.apiURL}/` + todo.id;
    return this.httpClient.put<any>(URL, todo, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteTodo(todoId: number) {
    const URL = `${this.apiURL}/` + todoId;
    return this.httpClient.delete<any>(URL).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
