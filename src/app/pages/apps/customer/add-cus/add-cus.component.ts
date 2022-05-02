import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModels } from '../../../_models/customer.model';
import { CustomerService } from '../../../_services/customer/customer.service';
import { User } from '../../../../modules/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cus',
  templateUrl: './add-cus.component.html',
  styleUrls: ['./add-cus.component.scss']
})
export class AddCusComponent implements OnInit {
  @Input() id: number;
  mainData: CustomerModels;
  userProfile: User | null = null;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  frmData = new FormGroup({
    user_id: new FormControl(''),
    cuscod: new FormControl(''), //cus id
    review: new FormControl(null, [Validators.required]),
  });

  constructor(private cdr: ChangeDetectorRef, private customerService: CustomerService, private fb: FormBuilder, private httpClient: HttpClient, public modal: NgbActiveModal) {
    const loadingSubscr = this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
   }

  ngOnInit(): void {
    const userProfile = localStorage.getItem('currentUser$'); 
    if(userProfile) {
      this.userProfile = JSON.parse(userProfile) as User;
      this.frmData.patchValue({user_id: this.userProfile.id, cuscod: this.id})
    }

    this.FUNC_getDataById();
  }

  FUNC_getDataById() {    
    this.customerService.find(this.id).subscribe((data: any)=>{
      this.mainData = data;
    })
  }

  saveSettings() {
    this.isLoading$.next(true);
    let formValue = this.frmData.value;
    //this.customerService.create(formValue);
    this.httpClient.post<any>(`${environment.apiUrl}` + '/review/add', formValue).subscribe();
    this.handleSaveMember();

    setTimeout(() => {
      this.modal.close(false);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1000);
  }

  handleSaveMember() {
    Swal.fire({
      title: 'บันทึกสำเร็จ!',
      text: 'บันทึกข้อมูลรีวิวสำเร็จ',
      icon: 'success',
      confirmButtonText: 'ตกลง',
    }).then((res) => {
      // if (res.isConfirmed) {
      //   this.modal.close(false);
      // }
    });
  }

}
