import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class configCusService {

    readonly apiURL = `${environment.apiUrl}`;

    constructor(private httpClient: HttpClient) { }
    model: any[] = [];


    editCus(val:any){
      const body = val;
      
      this.httpClient.put<any>(this.apiURL + '/customer/edit', body).subscribe(res =>{
        
      }, (error) => {
        console.error('error caught in component')

      } );

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