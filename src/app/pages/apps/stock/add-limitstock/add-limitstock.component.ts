import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LimitService } from '../../../_services/stock/LimitStock.services';
import { BehaviorSubject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-limitstock',
  templateUrl: './add-limitstock.component.html',
  styleUrls: ['./add-limitstock.component.scss']
})
export class AddLimitstockComponent implements OnInit {
  @Input() currLimit: number;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  frmData = new FormGroup({
    limitLow: new FormControl(null, [Validators.required]),
  });
  

  constructor(private cdr: ChangeDetectorRef, private limitService: LimitService, public modal: NgbActiveModal) { 
    const loadingSubscr = this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
  }

  saveSettings() {
    this.isLoading$.next(true);
    this.limitService.update(this.frmData.value.limitLow);
    this.handleSaveMember();

    setTimeout(() => {
      this.modal.close(false);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      window.location.reload();
    }, 1000);
  }

  handleSaveMember() {
    Swal.fire({
      title: 'บันทึกสำเร็จ!',
      text: 'บันทึกข้อมูลสำเร็จ',
      icon: 'success',
      confirmButtonText: 'ตกลง',
    }).then((res) => {
      // if (res.isConfirmed) {
      //   this.modal.close(false);
      // }
    });
  }

}
