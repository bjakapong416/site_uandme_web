import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';

import { addUserService } from '../register/adduser/adduser.service'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  @Input() uid: number;
  @Input() uemp_id: string;
  @Input() ufullname: string;
  @Input() urole: string;
  @Input() uemail: string;
  @Input() upassword: string;
  @Input() uphone: string;


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


  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
    public addUserService: addUserService
  ) { }


  profileForm = new FormGroup({
    id : new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.minLength(4)),
    fullname: new FormControl(''),
    employee_id: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(''),
  });


  ngOnInit(): void {
    this.profileForm.patchValue({id:this.uid ,email:this.uemail ,fullname:this.ufullname , employee_id:this.uemp_id , phone:this.uphone , role:this.urole})
    
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


    this.addUserService.editUserbyAdmin1(formValue);    
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
