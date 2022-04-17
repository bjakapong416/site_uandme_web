import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService, UserType ,User  } from '../../../modules/auth';

@Component({
  selector: 'app-settings2',
  templateUrl: './settings2.component.html',
  styleUrls: ['./settings2.component.scss']
})
export class Settings2Component implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  user$: User | null = null;


  constructor(private cdr: ChangeDetectorRef) { 
    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res) => (this.isLoading = res));
  this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    
    const userProfiles = localStorage.getItem('currentUser$')

    if(userProfiles != null){
      this.user$ = JSON.parse(userProfiles) as User ;
      
    }



  }


  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
