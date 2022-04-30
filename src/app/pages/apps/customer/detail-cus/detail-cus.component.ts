import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModels } from '../../../_models/customer.model';
import { CustomerService } from '../../../_services/customer/customer.service';
import { BillModels } from '../../../_models/bill.model';
import { BillService } from '../../../_services/bill/bill.service';

import { ReviewModels } from '../../../_models/review.model';
import { ReviewService } from '../../../_services/review/review.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-cus',
  templateUrl: './detail-cus.component.html',
  styleUrls: ['./detail-cus.component.scss'],
})
export class DetailCusComponent implements OnInit {
  @Input() id: number;
  mainData: CustomerModels;
  reviewData: ReviewModels[] = [];
  selectedTab: string;
  creditused: number;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.billDataSource){
      this.billDataSource.paginator = value;
    }
  }

  billColumns: string[] = ['doc_id', 'doc_date', 'name_sale', 'price', 'status_cus'];
  billDataSource = new MatTableDataSource();

  constructor(
    private customerService: CustomerService,
    private BillService: BillService,
    private ReviewService: ReviewService,
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

  ngAfterViewInit() {
    this.billDataSource.paginator = this.paginator;
  }

  FUNC_getDataById() {
    this.customerService.find(this.id).subscribe((data: any) => {
      this.mainData = data;
      this.creditused = (data.creditamt - data.creditbal);
    });

    this.ReviewService.find(this.id).subscribe((data: any) => {
      this.reviewData = data;
    });
    
    this.BillService.find_cus(this.id).subscribe((data: any) => {
      this.billDataSource = new MatTableDataSource(data);
    });
  }

  handelClickTab(tab: any) {
    this.selectedTab = tab;
  }

}
