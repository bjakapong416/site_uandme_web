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
import { SemiGuardService } from '../../_services/semiGuard.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { User } from 'src/app/modules/auth';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

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

  // Check User
  userProfile: User | null = null;
  checkRole : string;


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
  semiGuard: any = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    public billService: BillService,
    public semiGuardService: SemiGuardService,
  ) {}

  ngOnInit(): void {
    this.semiGuard = this.semiGuardService.ActiveRole;
    if(!this.semiGuard.app_bill)
      this.router.navigate(['/dashboard']);


    const userProfile = localStorage.getItem('currentUser$'); 
    if(userProfile) {
      this.userProfile = JSON.parse(userProfile) as User;
      this.checkRole = this.userProfile?.role;
    }      


    this.FUNC_Sync();
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

  FUNC_Sync(){
    this.billService.syncBillDB().subscribe((data: any) => {
      console.log("Sync OK");
    });
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

  downloadExcel() {
    const heading = [
      [
        'รหัส',
        'ชื่อลูกค้า',
        'เลขที่เอกสาร',
        'วันที่เอกสาร',
        'พนักงานขาย',
        'ยอดค้างชำระ',
        'สถานะ',
      ],
    ];

    const wscols = [
      { wch: 25 },
      { wch: 40 },
      { wch: 25 },
      { wch: 15 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
    ];

    const stockData = this.handleDataStockExcel();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(stockData);
    XLSX.utils.sheet_add_aoa(worksheet, heading);
    worksheet['!cols'] = wscols;
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    const fileName = 'bill.xlsx';
    FileSaver.saveAs(data, fileName);
  }

  handleDataStockExcel() {
    const tempData = this.dataSource.filteredData.map((item: any) => ({
      cuscod: item.cuscod,
      cusnam: item.cusnam,
      docnum: item.docnum,
      docdat: item.docdat,
      slmdes: item.slmdes,
      totamt: item.totamt,
      status: item.totamt > 0 ? 'ค้างจ่าย' : '',
    }));
    return tempData;
  }
}
