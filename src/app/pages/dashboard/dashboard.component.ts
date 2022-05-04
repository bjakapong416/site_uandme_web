import { Component, OnInit } from '@angular/core';
import { StockService } from './../_services/stock/stock.service';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public stockService: StockService) {}
  chartOptionsBar: any = {};
  chartOptionsPie: any = {};
  summaryStockData: any;
  sumStock: any = [];
  typeStock: any = [];
  sumTotal: number = 0;

  ngOnInit() {
    this.fetchSumaryStockData();
    this.chartOptionsBar = this.getChartOptionsBar();
    this.chartOptionsPie = this.getChartOptionsPie();

    console.log(this.sumTotal);
  }

  async fetchSumaryStockData() {
    const data = await this.stockService.getSummaryStock().toPromise();
    this.summaryStockData = data;
    this.summaryStockData.forEach((element: any) => {
      this.sumStock.push(element.sum);
      this.typeStock.push(element.itemgrp);
      this.sumTotal = this.sumTotal + element.sum;
    });
  }

  getChartOptionsBar() {
    const baseColor = getCSSVariableValue('--bs-' + 'primary');
    const labelColor = getCSSVariableValue('--bs-gray-700');
    return {
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
            return val + ' รายการ';
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

  getChartOptionsPie() {
    const baseColor = getCSSVariableValue('--bs-' + 'primary');
    const labelColor = getCSSVariableValue('--bs-gray-500');
    return {
      series: [3000, 1250, 250],
      chart: {
        type: 'donut',
        height: 200,
      },
      dataLabels: {
        enabled: false,
      },
      labels: [
        'ลูกค้าความเสี่ยงสูง',
        'ลูกค้าความเสี่ยงต่ำ',
        'ลูกค้าความเสี่ยงปานกลาง',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: 'bottom',
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
            size: '65%',
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
                fontSize: '22px',
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
                fontSize: '14px',
                fontFamily: 'Prompt, "Helvetica Neue", sans-serif',
                fontWeight: 400,
                color: labelColor,
                formatter: function (w: any) {
                  return w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
    };
  }
}
