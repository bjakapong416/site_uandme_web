import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReviewModels } from '../../_models/review.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  readonly apiURL = `${environment.apiUrl}/review`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ReviewModels[]> {
    return this.httpClient.get<ReviewModels[]>(this.apiURL + '/all').pipe(
      catchError(this.errorHandler)
    )
  }
 
  create(data: any): Observable<ReviewModels> {
    return this.httpClient.post<ReviewModels>(this.apiURL + '/add', JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: any): Observable<ReviewModels> {
    return this.httpClient.get<ReviewModels>(this.apiURL + '/' + id).pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: any, data: any): Observable<ReviewModels> {
    return this.httpClient.put<ReviewModels>(this.apiURL + '/' + id, JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: any){
    return this.httpClient.delete<ReviewModels>(this.apiURL + '/' + id, this.httpOptions).pipe(
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
