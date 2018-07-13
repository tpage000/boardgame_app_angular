import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { catchError, retry, mergeMap, map, tap } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${env.baseUrl}/friends/pool`)
  }

  getFriends() {
    return this.http.get(`${env.baseUrl}/friends`)
  }

  getGuests() {
    return this.http.get(`${env.baseUrl}/guests`)
      .pipe(
        catchError(this.handleError('search', []))
      );
  }

  getFriendsAndGuestsAndSelf() {
    return this.http.get(`${env.baseUrl}/friends/allplayers`);
  }

  addToFriends(id) {
    let data = { id };
    return this.http.post(`${env.baseUrl}/friends`, data)
  }

  addToGuests(guest) {
    return this.http.post(`${env.baseUrl}/guests`, guest)
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
