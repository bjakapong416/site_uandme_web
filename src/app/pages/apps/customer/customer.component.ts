import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerModels } from '../../_models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../_services/customer/customer.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCusComponent } from './add-cus/add-cus.component';
import { DetailCusComponent } from './detail-cus/detail-cus.component';
import { ViewEncapsulation } from '@angular/core';
import { SemiGuardService } from '../../_services/semiGuard.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';




const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  public circleColor: string;
  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'check_box',
    'name_cus',
    'tel',
    'area',
    'credit_day',
    'finan',
    'balance',
    'status_cus',
    'action',
  ];
  dataSource = new MatTableDataSource();

  mainDatas$: CustomerModels[] = [];
  selectedItemsList: any = [];
  semiGuard: any = [];


  usageTotal : number;

  constructor(
    // private route: ActivatedRoute,
    // private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    public customerService: CustomerService,
    public semiGuardService: SemiGuardService,
  ) {}

  ngOnInit(): void {
    this.semiGuard = this.semiGuardService.ActiveRole;
    if(!this.semiGuard.app_cus)
      this.router.navigate(['/dashboard']);

    this.FUNC_getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let textSearch = '';
      for (var key in data) {
        if (key == 'cusstatus') {
          if (data[key] == '0') textSearch += 'ต่ำ';
          else if (data[key] == '1') textSearch += 'กลาง';
          else if (data[key] == '2') textSearch += 'สูง';
          else if (data[key] == '999') textSearch += 'ห้ามขาย';
          else if (data[key] == '-1') textSearch += 'ปิดกิจการ';
        } else {
          textSearch += data[key];
        }
      }
      let searchStr = textSearch.toLowerCase();
      return searchStr.indexOf(filter.toLowerCase()) != -1;
    };
    return filterFunction;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  FUNC_getData() {
    this.customerService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      console.log(this.dataSource);

      this.dataSource.filteredData.forEach((element: any, index) => {
        if (index < 3) element.isChecked = true;
        else element.isChecked = false;

        const colorR = (Math.floor(Math.random() * 56) + 128).toString(16);
        const colorG = (Math.floor(Math.random() * 56) + 128).toString(16);
        const colorB = (Math.floor(Math.random() * 56) + 128).toString(16);
        element.circleColor = '#' + colorR + colorG + colorB;
      });

      this.fetchSelectedItems();
    });
  }

  FUNC_Delete(id: string) {
    this.customerService.delete(id).subscribe((res) => {
      this.mainDatas$ = this.mainDatas$.filter((item) => item.cuscod !== id);
      console.log('Post deleted successfully!');
    });
  }

  //action
  add(id: any) {
    const modalRef = this.modalService.open(AddCusComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.id = id;
  }

  details(id: any, color: any) {
    const modalRef = this.modalService.open(DetailCusComponent, {
      size: 'xl',
      windowClass: 'bg-blank',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.circleColor = color;
  }

  changeSelection() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.dataSource.filteredData.filter(
      (value: any) => {
        return value.isChecked;
      }
    );
  }

  downloadExcel() {
    const heading = [
      [
        'รหัสลูกค้า',
        'ชื่อลูกค้า',
        'เบอร์ติดต่อ',
        'เขต',
        'วงเงินอนุมัติ',
        'ยอดคงเหลือ',
        'สถานะ',
      ],
    ];

    const wscols = [
      { wch: 15 },
      { wch: 40 },
      { wch: 40 },
      { wch: 20 },
      { wch: 10 },
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
    const fileName = 'customer.xlsx';
    FileSaver.saveAs(data, fileName);
  }

  handleDataStockExcel() {
    const tempData = this.dataSource.filteredData.map((item: any) => ({
      accnum: item.accnum,
      cusnam: item.cusnam,
      telnum: item.telnum,
      areades: item.areades,
      creditamt: item.creditamt,
      creditbal: item.creditbal,
      cusstatus:
        item.cusstatus == null
          ? ''
          : item.cusstatus === '0'
          ? 'ต่ำ'
          : item.cusstatus === '1'
          ? 'กลาง'
          : item.cusstatus === '2'
          ? 'สูง'
          : item.cusstatus === '999'
          ? 'ห้ามขาย'
          : 'ปิดกิจการ',
    }));
    return tempData;
  }
}
