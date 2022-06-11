import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

import { UserModels } from '../../_models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService , User } from 'src/app/modules/auth';


@Injectable({ providedIn: 'root' })
export class userService {


  
    readonly apiURL = `${environment.apiUrl}`;



    user$: User | null = null;

    // readonly Apiurl ="http://128.199.86.71:8000";
    constructor(private httpClient: HttpClient) { }
    model: any[] = [];



    getUser1(): Observable<UserModels[]> {
        const userProfiles = localStorage.getItem('currentUser$')

        if(userProfiles != null){
          this.user$ = JSON.parse(userProfiles) as User ;
        }

        return this.httpClient.get<UserModels[]>(this.apiURL + '/listUsers' ).pipe(
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