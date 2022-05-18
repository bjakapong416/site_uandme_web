import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../_services/customer/customer.service';
import { StockService } from './../_services/stock/stock.service';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { Observable,  Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BillService } from './../_services/bill/bill.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public stockService: StockService,
    public customerService: CustomerService,
    public billService: BillService,
    private httpClient: HttpClient
  ) {

    this.customerRiskData$ = customerService.riskCount().subscribe((data) => {
      this.customerRiskData = data;
      this.customerRiskData = this.customerRiskData.sort((a: any, b: any) =>
        a.cusstatus === null
          ? 1
          : b.cusstatus === null
          ? -1
          : a.cusstatus === b.cusstatus
          ? 0
          : a.cusstatus < b.cusstatus
          ? -1
          : 1
      );
      this.customerRiskData.forEach((element: any) => {
        this.sumCustomer.push(element.count);
      });
    });
  }
  chartOptionsBar: any = {};
  chartOptionsPie: any = {};
  summaryStockData$: Observable<any>;
  summaryStockData: any;
  sumStock: any = [];
  typeStock: any = [];
  sumTotal: Observable<number>;
  customerRiskData$: Subscription;
  customerRiskData: any = [];
  sumCustomer: any = [];
  updateFlag: boolean = false;
  countBillData$: Observable<any>;
  countBillData: Observable<number>;
  countMoreOnce: Observable<number>;

  ngOnInit() {
    this.summaryStockData$ = this.stockService.getSummaryStock();

    this.summaryStockData$.subscribe((item: any)=>{
      this.summaryStockData = item;
      this.summaryStockData.forEach((element: any) => {
        this.sumStock.push(element.sum);
        this.typeStock.push(element.itemgrp);
      });
    });

    this.sumTotal = this.summaryStockData$.pipe(
      map((item: any) => item.map((i: any) => i.sum).reduce((oldVal: number, newVal: number) => oldVal + newVal, 0))
    );

    this.setChartOptionsBar();
    this.setChartOptionsPie();
    this.getBillData();
  }

  getBillData() {
    this.countBillData$ = this.billService.getAll();

    this.countBillData = this.countBillData$.pipe(
      map((item: any) => item.length)
    );
    
    const tempCount = this.billService.getAskBill();

    this.countMoreOnce = tempCount.pipe(
      map((item: any) => item.count)
    );
  }

  ngOnDestroy() {
    this.customerRiskData$.unsubscribe();
  }

  setChartOptionsBar(): void {
    const baseColor = getCSSVariableValue('--bs-primary');
    const labelColor = getCSSVariableValue('--bs-gray-700');
    this.chartOptionsBar = {
      series: [
        {
          name: 'จำนวน',
          data: this.sumStock,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: 300,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 5,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: this.typeStock,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: {
        type: 'solid',
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            const str = val.toString().split('.');
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return str.join('.') + ' รายการ';
          },
        },
      },
      colors: [baseColor],
      grid: {
        padding: {
          top: 10,
        },
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    };
  }

  setChartOptionsPie(): void {
    const labelColor = getCSSVariableValue('--bs-gray-900');
    this.chartOptionsPie = {
      series: this.sumCustomer,
      chart: {
        type: 'donut',
        height: 200,
      },
      dataLabels: {
        enabled: false,
      },
      labels: [
        `ลูกค้าความเสี่ยงต่ำ`,
        `ลูกค้าความเสี่ยงปานกลาง`,
        `ลูกค้าความเสี่ยงสูง`,
        `ยังไมไ่ด้ระบุ`,
      ],
      colors: ['#50CD89', '#FFA800', '#F64E60', '#999999'],
      legend: {
        fontSize: '14px',
        color: labelColor,
        fontFamily: 'Prompt, "Helvetica Neue", sans-serif',
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              width: '100%',
              height: 300,
            },
            legend: {
              position: 'bottom',
              fontSize: '14px',
              fontWeight: 400,
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10,
          },
          donut: {
            size: '75%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 20,
                fontWeight: 400,
                fontFamily: 'Prompt, "Helvetica Neue", sans-serif',
                formatter: function (val: any) {
                  return val;
                },
              },
              value: {
                show: true,
                fontWeight: 400,
                fontFamily: 'Prompt, "Helvetica Neue", sans-serif',
                offsetY: -20,
                formatter: function (val: any) {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: 'ลูกค้าทั้งหมด',
                fontSize: '12px',
                fontFamily: 'Prompt, "Helvetica Neue", sans-serif',
                fontWeight: 400,
                color: labelColor,
                formatter: function (w: any) {
                  const sumWithInitial = w.globals.seriesTotals.reduce(
                    (a: any, b: any) => a + b,
                    0
                  );
                  const str = sumWithInitial.toString().split('.');
                  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  return str.join('.');
                },
              },
            },
          },
        },
      },
    };
  }
}
