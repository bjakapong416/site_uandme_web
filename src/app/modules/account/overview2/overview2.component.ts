import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService, UserType ,User  } from '../../../modules/auth';

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.scss']
})
export class Overview2Component implements OnInit {


  // user$: Observable<UserType> ;

  user$: User | null = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    // this.user$ = this.auth.currentUserSubject.asObservable();

    const userProfiles = localStorage.getItem('currentUser$')

    if(userProfiles != null){
      this.user$ = JSON.parse(userProfiles) as User ;
      
    }


    
  }

}
