import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LimitService {
  readonly apiURL = `${environment.apiUrl}/config`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/getitems').pipe(catchError(this.errorHandler));
  }

  update(val: any) {
    return this.httpClient.post<any>(this.apiURL + '/setitems?num=' + val, null).subscribe();
  }

  getNotiTF(val: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/noti/' + val).pipe(catchError(this.errorHandler));
  }

  getNotiData(val: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/noti/stock/' + val).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
