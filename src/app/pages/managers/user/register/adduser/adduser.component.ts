import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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


  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    fullname: new FormControl(''),
    employee_id: new FormControl(''),
    phone: new FormControl('')
  });

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  saveSettings() {
   
    console.log("OK");
    
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 1500);

  }


}
