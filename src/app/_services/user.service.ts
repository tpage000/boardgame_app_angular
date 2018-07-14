import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, mergeMap, retry, tap , map} from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error);
      console.log(error.status);
      console.log(error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  updateUser(id, data) {
    return this.http.put(`${env.localBaseUrl}/users/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getSelf() {
    return this.http.get(`${env.localBaseUrl}/friends/self`)
  }
}

