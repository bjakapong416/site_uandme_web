import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class deleteService {

    readonly apiURL = `${environment.apiUrl}`;

    constructor(private httpClient: HttpClient) { }
    model: any[] = [];



    // Set localstorage user
    setGetMe(val:any)
    {
      this.httpClient.get<any>(this.apiURL + '/getUserByID/'+val).subscribe(res =>{

        if (res != null){   
           localStorage.setItem('currentUser$', JSON.stringify(res)); 
          window.location.reload();
        }
        
      });      
    
    }

    // Edit user setting page
    delete(val:any){
      
      console.log(val);
    
      this.httpClient.delete<any>(this.apiURL + '/delUserByID/' + val).subscribe();
      

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