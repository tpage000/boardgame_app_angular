import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    if (error.error.message.startsWith('E11000')) {
      return throwError('Username already taken');
    }
    return throwError(error.error.message);
  };

  register(data) {
    return this.http.post(`${env.baseUrl}/auth/register`, data, httpOptions)
      .pipe(
        map(res => {
          sessionStorage.setItem('token', res['token']);
          return res;
        }),
        catchError(this.handleError)
      )
  }
}


