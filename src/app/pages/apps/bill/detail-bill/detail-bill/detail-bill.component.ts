import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillModels } from '../../../../_models/bill.model';
import { BillService } from '../../../../_services/bill/bill.service';
import { askBillModels } from '../../../../_models/askBill.model';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.scss']
})
export class DetailBillComponent implements OnInit {
  public circleColor: string;
  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
  ];

  @Input() id: number;
  lastIndex: number;
  selectedTab: string;
  mainData: BillModels;
  askData: askBillModels[] = [];

  tabs = [{ title: 'การทวงถาม', content: 'detail', active: true }];

  constructor(
    private BillService: BillService,
    public modal: NgbActiveModal
  ) { }

  async ngOnInit(): Promise<void> {
    this.selectedTab = 'detail';
    await this.FUNC_getDataById();
    this.lastIndex = this.askData.length;
    const colorR = (Math.floor(Math.random() * 56) + 128).toString(16);
    const colorG = (Math.floor(Math.random() * 56) + 128).toString(16);
    const colorB = (Math.floor(Math.random() * 56) + 128).toString(16);
    this.circleColor = '#' + colorR + colorG + colorB;
  }

  async FUNC_getDataById() {
    const data = await this.BillService.find(this.id).toPromise();
    this.mainData = data;

    // const askBill = await this.BillService.find_review(this.id).toPromise();
    // this.askData = askBill;
    const reviews: any = await this.BillService.find_review(this.id).toPromise();
    this.askData = Object.keys(reviews).map((index) => {
      let review = reviews[index];
      return review;
    });
  }

}
