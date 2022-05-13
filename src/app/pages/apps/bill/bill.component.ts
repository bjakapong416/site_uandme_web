import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BillModels } from '../../_models/bill.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../_services/bill/bill.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailBillComponent } from './detail-bill/detail-bill/detail-bill.component';
import { AddBillComponent } from './add-bill/add-bill/add-bill.component';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'yyyy-MM', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class BillComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pipe = new DatePipe('en-US');
  filterValues: any = { all: '', date: '' };
  @Input() chartColor: string = '';
  @Input() chartHeight: string;
  countBillData: any;
  countMoreOnce: any;
  chartOptions: any = {};
  pickDateValue: any;

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
    private httpClient: HttpClient,
    public billService: BillService
  ) {}

  ngOnInit(): void {
    this.FUNC_getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Called on Filter change
  filterChange(filter: any, event: any) {
    //let filterValues = {}
    if (filter == 'date') {
      let date = event.target.value;
      this.filterValues[filter] = this.pipe.transform(date, 'yyyy-MM') || '';
    } else {
      this.filterValues[filter] = event.target.value.trim().toLowerCase();
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log(this.dataSource.filteredData);
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
      this.dataSource.filterPredicate = this.NEW_createFilter();
      this.countBillData = this.dataSource.filteredData.length;
      //console.log(this.dataSource);
    });

    this.httpClient
      .get(`${environment.apiUrl}` + '/getAskbill')
      .subscribe((res: any) => {
        this.countMoreOnce = res.count;
      });
  }

  FUNC_Delete(id: string) {
    this.billService.delete(id).subscribe((_res) => {
      this.mainDatas$ = this.mainDatas$.filter((item) => item.docnum !== id);
      console.log('Post deleted successfully!');
    });
  }

  NEW_createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let textSearch = '';
      for (var key in data) {
        textSearch += data[key];
      }
      //console.log(filter);
      let searchStr = textSearch.toLowerCase();
      return (
        searchStr.indexOf(searchTerms.all.toLowerCase()) != -1 &&
        data.docdat.toLowerCase().indexOf(searchTerms.date) !== -1
      );
    };
    return filterFunction;
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

  setMonthYear(event: Event, datepicker: MatDatepicker<any>) {
    let date = event.toString();
    this.pickDateValue = event;
    this.filterValues['date'] = this.pipe.transform(date, 'yyyy-MM') || '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
    datepicker.close();
  }
}
