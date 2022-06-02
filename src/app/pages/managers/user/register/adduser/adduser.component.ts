import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';

import { addUserService } from './adduser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  @Input() id: number;

  // profileForm: FormGroup;

  roles: any[] = [ 
    'CEO ผู้ประกอบการ',
    'Standard',
    'Head of Sale',
    'Sale',
    'Head of Co-Sale',
    'Co-Sale',
    'Stock',
    'Finance 1',
    'Finance 2',
    'ต่างประเทศ 1',
    'ต่างประเทศ 2',
    //'Admin System',
  ];

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  profileForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.minLength(4)),
    fullname: new FormControl(''),
    employee_id: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
    public addUserService: addUserService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    // this.profileForm = this.fb.group({
    //   email: ['', Validators.required, Validators.email],
    //   password: ['', Validators.required],
    //   fullname: ['', Validators.required],
    //   employee_id: ['', Validators.required],
    //   phone: ['', Validators.required],
    //   role: ['', Validators.required],
    // });
  }

  saveSettings() {
    this.isLoading$.next(true);
    let formValue = this.profileForm.value;

    // Convert Roles to number
    for (let pos in this.roles) {
      if (formValue.role == this.roles[pos]) {
        formValue.role = pos.toString();
      }
    }

    this.addUserService.signup(formValue);
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

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
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
