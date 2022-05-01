import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NgbActiveModal,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { CustomerModels } from '../../../_models/customer.model';
import { CustomerService } from '../../../_services/customer/customer.service';
import { BillModels } from '../../../_models/bill.model';
import { BillService } from '../../../_services/bill/bill.service';

import { ReviewModels } from '../../../_models/review.model';
import { ReviewService } from '../../../_services/review/review.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';

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
  chartOptions: any = {};
  series: number;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.billDataSource) {
      this.billDataSource.paginator = value;
    }
  }

  billColumns: string[] = [
    'doc_id',
    'doc_date',
    'name_sale',
    'price',
    'status_cus',
  ];
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

  async ngOnInit(): Promise<void> {
    await this.FUNC_getDataById();
    this.selectedTab = 'detail';
    this.chartOptions = this.getChartOptions();
  }

  ngAfterViewInit() {
    this.billDataSource.paginator = this.paginator;
  }

  async FUNC_getDataById() {
    const data = await this.customerService.find(this.id).toPromise();
    this.mainData = data;
    this.creditused = data.creditamt - data.creditbal;

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

  getChartOptions() {
    const baseColor = getCSSVariableValue('--bs-' + 'success');
    const lightColor = getCSSVariableValue('--bs-light-' + 'success');
    const labelColor = getCSSVariableValue('--bs-gray-700');
    const labelColor2 = getCSSVariableValue('--bs-gray-400');

    return {
      series: [this.mainData.creditbal],
      chart: {
        fontFamily: 'inherit',
        height: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '65%',
          },
          dataLabels: {
            name: {
              show: true,
              fontWeight: '700',
              color: labelColor2,
              fontSize: '12px',
              offsetY: 12,
            },
            value: {
              color: labelColor,
              fontSize: '20px',
              fontWeight: '700',
              offsetY: -20,
              show: true,
              formatter: function (val: number) {
                return val;
              },
            },
          },
          track: {
            background: lightColor,
            strokeWidth: '100%',
          },
        },
      },
      colors: [baseColor],
      stroke: {
        lineCap: 'round',
      },
      labels: ['ยอดคงเหลือ'],
    };
  }
}
