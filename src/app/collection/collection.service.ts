import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, mergeMap, map, tap } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollection() {
    return this.http.get(`${env.baseUrl}/games`)
  }

  addToCollection(game) {
    return this.http.post(`${env.baseUrl}/games`, game)
  }

  getGameByBGGId(id: number) {
    return this.http.get(`${env.baseUrl}/games/query/${id}`)
  }

  searchForGame(title: string) {
    // if (!title.trim()) return of([]);
    return this.http.get(`${env.baseUrl}/games/search?title=${title}`);
  }
}
