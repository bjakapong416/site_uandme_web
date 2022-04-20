import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModels } from '../../_models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiURL = `${environment.apiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<UserModels[]> {
    return this.httpClient.get<UserModels[]>(this.apiURL + '/listUsers').pipe(
      catchError(this.errorHandler)
    )
  }

  async async_getAll() {
    return await this.httpClient.get<UserModels[]>(this.apiURL + '/all').pipe( )
  }
    
  create(data: any): Observable<UserModels> {
    return this.httpClient.post<UserModels>(this.apiURL + '/', JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: any): Observable<UserModels> {
    return this.httpClient.get<UserModels>(this.apiURL + '/' + id).pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: any, data: any): Observable<UserModels> {
    return this.httpClient.put<UserModels>(this.apiURL + '/' + id, JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: any){
    return this.httpClient.delete<UserModels>(this.apiURL + '/' + id, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
