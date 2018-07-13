import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, mergeMap, map, tap } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  getSessions() {
    return this.http.get(`${env.baseUrl}/sessions`)
  }

  addSession(session) {
    return this.http.post(`${env.baseUrl}/sessions`, session)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
 
  private log(message) {
    console.warn('Log: ', message);
  }
}
