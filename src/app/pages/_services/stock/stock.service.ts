import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StockModels } from '../../_models/stock.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  readonly apiURL = `${environment.apiUrl}/stock`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<StockModels[]> {
    return this.httpClient
      .get<StockModels[]>(this.apiURL + '/all')
      .pipe(catchError(this.errorHandler));
  }

  async async_getAll() {
    return await this.httpClient
      .get<StockModels[]>(this.apiURL + '/all')
      .pipe();
  }

  create(data: any): Observable<StockModels> {
    return this.httpClient
      .post<StockModels>(
        this.apiURL + '/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: any): Observable<StockModels> {
    return this.httpClient
      .get<StockModels>(this.apiURL + '/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: any, data: any): Observable<StockModels> {
    return this.httpClient
      .put<StockModels>(
        this.apiURL + '/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: any) {
    return this.httpClient
      .delete<StockModels>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getSummaryStock(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/get/summary');
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
