import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, tap , map} from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getPlays() {
    return this.http.get(`${env.baseUrl}/stats/plays`)
  }
}
