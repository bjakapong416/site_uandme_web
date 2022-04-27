import { ChangeDetectorRef,Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';




@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  @Input() id: number;

  roles: any[] = [ 'Sale', 'Co-Sale', 'CEO'];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    fullname: new FormControl(''),
    employee_id: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl('')
  });

  constructor(public modal: NgbActiveModal, private cdr: ChangeDetectorRef) {
    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
   }

  ngOnInit(): void {
  }

  saveSettings() {
    this.isLoading$.next(true);
    let formValue = this.profileForm.value;

    console.log(formValue);
    window.location.reload();
    
    
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);

  }

  public decline() {
    this.modal.close(false);
  }


}
