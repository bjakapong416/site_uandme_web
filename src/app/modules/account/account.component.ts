import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserType ,User  } from '../../modules/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  user$: Observable<UserType> ;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();

  }

}
