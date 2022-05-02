import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from '../../../../_services/bill/bill.service';
import { User } from '../../../../../modules/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  userProfile: User | null = null;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  frmData = new FormGroup({
    user_id: new FormControl(''),
    docnum: new FormControl(''), //docnum
    review: new FormControl(null, [Validators.required]),
  });

  constructor(private cdr: ChangeDetectorRef, private billService: BillService, private fb: FormBuilder, private httpClient: HttpClient, public modal: NgbActiveModal) {
    const loadingSubscr = this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    const userProfile = localStorage.getItem('currentUser$'); 
    if(userProfile) {
      this.userProfile = JSON.parse(userProfile) as User;
      this.frmData.patchValue({user_id: this.userProfile.id, docnum: this.id})
    }
  }

  saveSettings() {
    this.isLoading$.next(true);
    let formValue = this.frmData.value;
    //this.billService.create_review(formValue);
    this.httpClient.post<any>(`${environment.apiUrl}` + '/billreview/add', formValue).subscribe();

    setTimeout(() => {
      this.modal.close(false);
      this.handleSaveMember();
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
