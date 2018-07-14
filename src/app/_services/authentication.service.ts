import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
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

  // currentUser = null;

  // dev user
  currentUser:any = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNDEwY2YyZDI2Zjg0ZGQ3NWNlNjYwZSIsInVzZXJuYW1lIjoidGhvbSIsImlhdCI6MTUzMTU0MzE5NCwiZXhwIjoxNTMyMTQ3OTk0fQ.H72dVFT-sm78hG2s9Heg1rjC9KG_rM25oLzB8dOrgbw" };

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
    console.log('the data to send: ', data)
    return this.http.post(`${env.localBaseUrl}/users/login`, data, httpOptions)
      .pipe(
        map(res => {
          this.currentUser = res;
          return res;
        }),
        catchError(this.handleError)
      )
  }
}

