import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, tap , map} from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

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

  login(data) {
    return this.http.post(`${env.localBaseUrl}/users/login`, data, httpOptions)
      .pipe(
        map(res => {
          sessionStorage.setItem('token', res['token']);
          return res;
        }),
        catchError(this.handleError)
      )
  }

  logout() {
    sessionStorage.removeItem('token');
    return of({ message: 'logged out' });
  }

  isLoggedIn() {
    return sessionStorage.getItem('token');
  }
}

