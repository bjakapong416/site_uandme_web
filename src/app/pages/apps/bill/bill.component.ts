import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BillModels } from '../../_models/bill.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../_services/bill/bill.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailBillComponent } from './detail-bill/detail-bill/detail-bill.component';
import { AddBillComponent } from './add-bill/add-bill/add-bill.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() chartColor: string = '';
  @Input() chartHeight: string;
  chartOptions: any = {};

  displayedColumns: string[] = [
    'name_cus',
    'doc_id',
    'doc_date',
    'name_sale',
    'price',
    'status_cus',
    'action',
  ];
  dataSource = new MatTableDataSource();

  mainDatas$: BillModels[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    public billService: BillService
  ) {}

  ngOnInit(): void {
    this.chartOptions = getChartOptions(this.chartHeight, this.chartColor);
    this.FUNC_getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  FUNC_getData() {
    this.billService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  FUNC_Delete(id: string) {
    this.billService.delete(id).subscribe((res) => {
      this.mainDatas$ = this.mainDatas$.filter((item) => item.docnum !== id);
      console.log('Post deleted successfully!');
    });
  }

  //action
  add(id: any, name: any) {
    const modalRef = this.modalService.open(AddBillComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.name = name;
  }

  details(id: any) {
    const modalRef = this.modalService.open(DetailBillComponent, {
      size: 'xl',
      windowClass: 'bg-blank',
    });
    modalRef.componentInstance.id = id;
  }
}

function getChartOptions(chartHeight: string, chartColor: string) {
  const labelColor = getCSSVariableValue('--bs-gray-800');
  const strokeColor = getCSSVariableValue('--bs-gray-300');
  const baseColor = getCSSVariableValue('--bs-' + chartColor);
  const lightColor = getCSSVariableValue('--bs-light-' + chartColor);

  return {
    series: [
      {
        name: 'Net Profit',
        data: [15, 25, 15, 40, 20, 50],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
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
          return '$' + val + ' thousands';
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
}
