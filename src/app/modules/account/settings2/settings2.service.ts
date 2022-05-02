import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

import { UserModels } from '../../../pages/_models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService , User } from 'src/app/modules/auth';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class setting2sService {
    readonly apiURL = `${environment.apiUrl}`;

    user$: User | null = null;

    // readonly Apiurl ="http://128.199.86.71:8000";
    constructor(private httpClient: HttpClient, private router: Router) { }
    model: any[] = [];



    // Set localstorage user
    setGetMe(val:any)
    {
      this.httpClient.get<any>(this.apiURL + '/getUserByID/'+val).subscribe(res =>{

        if (res != null){   
          localStorage.setItem('currentUser$', JSON.stringify(res)); 
          this.router.navigate(['/crafted/account/overview2']);
          setTimeout(()=>{ window.location.reload(); }, 50);
        }
        
      });      
    
    }

    // Edit user setting page
    editUser(val:any){
      const body = val;
      this.httpClient.put<any>(this.apiURL + '/editUser', body).subscribe();

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