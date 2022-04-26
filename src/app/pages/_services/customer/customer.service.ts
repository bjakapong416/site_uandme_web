import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerModels } from '../../_models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly apiURL = `${environment.apiUrl}/customer`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CustomerModels[]> {
    return this.httpClient.get<CustomerModels[]>(this.apiURL + '/limit/5').pipe(
      catchError(this.errorHandler)
    )
  }

  async async_getAll() {
    return await this.httpClient.get<CustomerModels[]>(this.apiURL + '/all').pipe( )
  }
    
  create(data: any): Observable<CustomerModels> {
    return this.httpClient.post<CustomerModels>(this.apiURL + '/', JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: any): Observable<CustomerModels> {
    return this.httpClient.get<CustomerModels>(this.apiURL + '/' + id).pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: any, data: any): Observable<CustomerModels> {
    return this.httpClient.put<CustomerModels>(this.apiURL + '/' + id, JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: any){
    return this.httpClient.delete<CustomerModels>(this.apiURL + '/' + id, this.httpOptions).pipe(
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
