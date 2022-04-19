import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BillModels } from '../../_models/bill.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  readonly apiURL = `${environment.apiUrl}/bill`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<BillModels[]> {
    return this.httpClient.get<BillModels[]>(this.apiURL + '/all').pipe(
      catchError(this.errorHandler)
    )
  }


  async async_getAll() {
    return await this.httpClient.get<BillModels[]>(this.apiURL + '/all').pipe( )
  }
    
  create(data: any): Observable<BillModels> {
    return this.httpClient.post<BillModels>(this.apiURL + '/', JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: any): Observable<BillModels> {
    return this.httpClient.get<BillModels>(this.apiURL + '/' + id).pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: any, data: any): Observable<BillModels> {
    return this.httpClient.put<BillModels>(this.apiURL + '/' + id, JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: any){
    return this.httpClient.delete<BillModels>(this.apiURL + '/' + id, this.httpOptions).pipe(
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
