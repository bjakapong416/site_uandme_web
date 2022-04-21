import { Component, Input, OnDestroy, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModels } from '../../../_models/customer.model';
import { CustomerService } from '../../../_services/customer/customer.service';

@Component({
  selector: 'app-add-cus',
  templateUrl: './add-cus.component.html',
  styleUrls: ['./add-cus.component.scss']
})
export class AddCusComponent implements OnInit {
  @Input() id: number;
  mainData: CustomerModels;
  //formGroup: FormGroup;

  //constructor(private customerService: CustomerService, private fb: FormBuilder, public modal: NgbActiveModal) { }
  constructor(private customerService: CustomerService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.FUNC_getDataById();
  }

  FUNC_getDataById() {
    this.customerService.find(this.id).subscribe((data: any)=>{
      this.mainData = data;
      console.log(data);
    })
  }

}
