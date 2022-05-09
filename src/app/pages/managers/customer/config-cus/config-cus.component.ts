import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';

import { configCusService } from './config-cus.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-cus',
  templateUrl: './config-cus.component.html',
  styleUrls: ['./config-cus.component.scss']
})
export class ConfigCusComponent implements OnInit {
  @Input() uid: any;

  risk2: any[] = ['Low' , 'Medium' , 'High'];

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
    public configService: configCusService


  ) { }


  profileForm = new FormGroup({
    cuscod : new FormControl(null),
    cusstatus: new FormControl(null),
    maplink: new FormControl(null, Validators.minLength(4)),
    highlight: new FormControl(null, Validators.minLength(4)),

  });


  ngOnInit(): void {
    this.profileForm.patchValue({cuscod:this.uid })

  }


  saveSettings() {
    this.isLoading$.next(true);
    let formValue = this.profileForm.value;

    // Convert Roles to number
    for (let pos in this.risk2) {
      if (formValue.cusstatus == this.risk2[pos]) {
        formValue.cusstatus = pos.toString();
      }
    }
     

    
    this.configService.editCus(formValue);    
    this.handleSaveMember();

    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1000);
  }

  // Close modal
  public decline() {
    this.modal.close(false);
  }

  handleSaveMember() {
    Swal.fire({
      title: 'บันทึกสำเร้จ!',
      text: 'บันทึกข้อมูลสมาชิกสำเร็จ',
      icon: 'success',
      confirmButtonText: 'ตกลง',
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.reload();
      }
    });
  }


}
