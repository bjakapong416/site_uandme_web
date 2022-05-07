import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModels } from '../../../_models/customer.model';
import { CustomerService } from '../../../_services/customer/customer.service';
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
    // this.ReviewService.find(this.id).subscribe((data: any) => {
    //   this.reviewData = data;
    // });

    const reviews: any = await this.ReviewService.find(this.id).toPromise();
    this.reviewData = Object.keys(reviews).map((index) => {
      let review = reviews[index];
      review.shortName =
        review.fullname != null ? review.fullname.charAt(0) : 'U';
      return review;
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
    const series =
      this.mainData.creditamt !== 0
        ? (this.mainData.creditbal * 100) / this.mainData.creditamt
        : 0;
    return {
      series: [series],
      chart: {
        fontFamily: 'inherit',
        height: 200,
        type: 'radialBar',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 200,
            },
          },
        },
      ],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '70%',
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
              formatter: function (_val: number, opts: any) {
                return opts.globals.labels[1];
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
      labels: ['ยอดคงเหลือ', this.mainData.creditbal],
    };
  }
}
