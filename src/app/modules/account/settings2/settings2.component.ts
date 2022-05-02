import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService, UserType ,User  } from '../../../modules/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { setting2sService } from './settings2.service';

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

  profileForm = new FormGroup({
    id: new FormControl(''),
    fullname: new FormControl(''),
    employee_id: new FormControl(''),
    phone: new FormControl('')
  });




  constructor(private cdr: ChangeDetectorRef,public settingService: setting2sService) { 
    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res) => (this.isLoading = res));
  this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    const userProfiles = localStorage.getItem('currentUser$')
    if(userProfiles != null){
      this.user$ = JSON.parse(userProfiles) as User ;
      this.profileForm.patchValue({id:this.user$.id ,fullname:this.user$.fullname , employee_id:this.user$.employee_id , phone:this.user$.phone})
    }
  }



  saveSettings() {
    this.isLoading$.next(true);
    let formValue = this.profileForm.value;
    this.settingService.editUser(formValue);  

    setTimeout(() => {
      this.settingService.setGetMe(this.user$?.id)
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1000);

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
