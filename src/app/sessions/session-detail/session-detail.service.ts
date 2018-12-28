import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
// import { catchError, retry, mergeMap, map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionDetailService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error);
      console.log(error.status);
      console.log(error.message);
    }
    return throwError(error.error.message);
  };

  getSession(id) {
    console.log(id);
    return this.http.get(`${env.baseUrl}/sessions/${id}`)
  }

  submitComments(id, comments) {
    const data = { comments }
    // console.log(data)
    return this.http.put(`${env.baseUrl}/sessions/${id}?updateComments=true`, data)
  }
}

