import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModels } from '../../../_models/customer.model';
import { CustomerService } from '../../../_services/customer/customer.service';
import { BillModels } from '../../../_models/bill.model';
import { BillService } from '../../../_services/bill/bill.service';

@Component({
  selector: 'app-detail-cus',
  templateUrl: './detail-cus.component.html',
  styleUrls: ['./detail-cus.component.scss'],
})
export class DetailCusComponent implements OnInit {
  @Input() id: number;
  mainData: CustomerModels;
  reviewData: [];
  billData: BillModels;
  selectedTab: string;

  constructor(
    private customerService: CustomerService,
    private BillService: BillService,
    public modal: NgbActiveModal
  ) {}

  tabs = [
    { title: 'รายละเอียด', content: 'detail', active: true },
    { title: 'รีวิวลูกค้า', content: 'review' },
    { title: 'บิลค้างจ่าย', content: 'bill' },
  ];

  ngOnInit(): void {
    this.FUNC_getDataById();
    this.selectedTab = 'detail';
  }

  FUNC_getDataById() {
    this.customerService.find(this.id).subscribe((data: any) => {
      this.mainData = data;
      console.log(data);
      console.log(location);
    });
  }

  handelClickTab(tab: any) {
    this.selectedTab = tab;
  }

  
}
