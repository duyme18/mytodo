import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  }

  private readonly apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getAllCommentByTodo(todoId?: number) {
    const URL = `${this.apiURL}todo/comments/` + todoId;
    return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getComment(commentId: number) {
    const URL = `${this.apiURL}comment/` +commentId;
    return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addComment(id: number, comment: Comment) {
    const URL = `${this.apiURL}comment/` + id;
    return this.httpClient.post<any>(URL, comment, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteComment(id: number) {
    const URL = `${this.apiURL}comment/` + id;
    return this.httpClient.delete<any>(URL).pipe(catchError(this.handleError));
  }

  public modifyComment(comment: Comment) {
    const URL = `${this.apiURL}comment/` + comment.commentId;
    return this.httpClient.put<any>(URL, comment, this.httpOptions).pipe(catchError(this.handleError));
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
