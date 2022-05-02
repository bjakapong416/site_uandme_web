import { ChangeDetectorRef,Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { deleteService } from './delete.service';

import { UserModels } from 'src/app/pages/_models/user.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() id: number;
  @Input() emp_id: string;
  @Input() fullname: string;
  @Input() role: string;

  fname : string | null = null;
  userid : any | null = null;
  empid : any | null = null;
  roles : any | null = null;


  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];


  constructor(public modal: NgbActiveModal,  private cdr: ChangeDetectorRef,public deleteService: deleteService) {
    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
   }

  ngOnInit(): void {
    this.FUNC_getDataById()
  }


  FUNC_getDataById() {
    this.fname = this.fullname;
    this.userid = this.id;
    this.empid = this.emp_id;
    this.roles = this.role;
  }


  saveSettings() {
    this.isLoading$.next(true);
    this.deleteService.delete(this.userid);
    
    setTimeout(() => {
      window.location.reload();
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
    
  }


}
