import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModels } from '../../../_models/customer.model';
import { CustomerService } from '../../../_services/customer/customer.service';


@Component({
  selector: 'app-detail-cus',
  templateUrl: './detail-cus.component.html',
  styleUrls: ['./detail-cus.component.scss']
})
export class DetailCusComponent implements OnInit {
  @Input() id: number;
  mainData: CustomerModels;

  constructor(private customerService: CustomerService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.FUNC_getDataById();
  }

  FUNC_getDataById() {
    this.customerService.find(this.id).subscribe((data: any)=>{
      this.mainData = data;
      console.log(data);
      console.log(location)
    })
  }

}
