import { Component, OnInit, ViewChild } from '@angular/core';
import { StockModels } from '../../_models/stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../_services/stock/stock.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLimitstockComponent } from './add-limitstock/add-limitstock.component';
import { LimitService } from '../../_services/stock/LimitStock.services';
import { DetailStockComponent } from './detail-stock/detail-stock.component';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterValues: any = { all: '', unitnam: '', itemgrp: '' };
  filterSelectObj: any = [];

  displayedColumns: string[] = [
    'name',
    'type',
    'qty',
    'unit',
    'packqty',
    'packunit',
    'realqty',
    'action',
  ];
  fieldColumns: string[] = [
    'itemno',
    'itemdes',
    'itemgrp',
    'qty',
    'unitnam',
    'itemno',
    'packqty',
    'packunit',
    'realqty', //make
  ];
  dataSource = new MatTableDataSource();
  dataSourceFilters = new MatTableDataSource();
  currLimit: any;
  dataLength = 0;

  p: number = 1;
  lowValue: number = 0;
  highValue: number = 10;

  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: any): void {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  mainDatas$: StockModels[] = [];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    public limitService: LimitService,
    public stockService: StockService
  ) {
    this.limitService.getAll().subscribe((data: any) => {
      this.currLimit = data.limitlow;
    });
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'เลือกประเภทสินค้า',
        columnProp: 'itemgrp',
        options: [],
      },
      {
        name: 'เลือกหน่วยสินค้า',
        columnProp: 'packunit',
        options: [],
      },
    ];
  }

  ngOnInit(): void {
    this.FUNC_getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  FUNC_getData() {
    this.limitService.getAll().subscribe((data: any) => {
      this.currLimit = data.limitlow;
    });

    this.stockService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSourceFilters = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.filterSelectObj.filter((o: any) => {
        o.options = this.getFilterObject(data, o.columnProp);
      });

      this.dataSource.filteredData.forEach((element: any, index) => {
        const calQty = Math.floor(element.qty / element.packqty);
        element.calQty = calQty;
      });

      this.dataSource.filterPredicate = this.NEW_createFilter();
      console.log(this.dataSource.filteredData);
    });
  }

  FUNC_Delete(id: string) {
    this.stockService.delete(id).subscribe((res) => {
      this.mainDatas$ = this.mainDatas$.filter((item) => item.itemno !== id);
      console.log('Post deleted successfully!');
    });
  }

  NEW_createFilter() {
    let currlimit = this.currLimit;
    // console.log(this.currLimit);
    // console.log(currlimit);
    let filterFunction = function (data: any, filter: string): boolean {
      let qty_Status = '';
      if(data.calQty == 0) {
        qty_Status = 'Soldout'
      } else if(data.calQty <= currlimit) {
        qty_Status = 'low stock'
      }
      let searchTerms = JSON.parse(filter);
      let searchStr = (data.itemno + data.itemdes + data.itemgrp + data.qty + data.unitnam + data.whdes + data.itemno + data.packqty + data.packunit + data.calQty + qty_Status).toLowerCase();
      return searchStr.indexOf(searchTerms.all.toLowerCase()) != -1 && data.unitnam.toLowerCase().indexOf(searchTerms.unitnam) !== -1 && data.itemgrp.toLowerCase().indexOf(searchTerms.itemgrp) !== -1;
    };
    return filterFunction;
  }

  //Filter
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word: any) => {
                if (
                  data[col].toString().toLowerCase().indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // Called on Filter change
  filterChange(filter: any, event: any) {
    //let filterValues = {}
    this.filterValues[filter] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    //this.dataSource.filter = JSON.stringify(filterValue.trim().toLowerCase())

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  LimitItems() {
    const modalRef = this.modalService.open(AddLimitstockComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.currLimit = this.currLimit;
  }

  details(s_id: any, s_name: any, s_qty: any, s_unit: any, s_calQty: any, s_runit:any) {
    const modalRef = this.modalService.open(DetailStockComponent, {
      size: 'x1',
    });

    modalRef.componentInstance.id = s_id;
    modalRef.componentInstance.name = s_name;
    modalRef.componentInstance.qty = s_qty;
    modalRef.componentInstance.unit = s_unit;
    modalRef.componentInstance.calQty = s_calQty;
    modalRef.componentInstance.packUnit = s_runit;
  }

  downloadExcel() {
    const heading = [
      [
        'ชื่อสินค้า',
        'รายละเอียดสินค้า',
        'ประเภทสินค้า',
        'สินค้าคงเหลือ',
        'หน่วย',
        'คลัง',
      ],
    ];

    const wscols = [
      { wch: 25 },
      { wch: 40 },
      { wch: 25 },
      { wch: 15 },
      { wch: 10 },
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
    const fileName = 'stock.xlsx';
    FileSaver.saveAs(data, fileName);
  }

  handleDataStockExcel() {
    const tempData = this.dataSource.filteredData.map((item: any) => ({
      itemno: item.itemno,
      itemdes: item.itemdes,
      itemgrp: item.itemgrp,
      qty: item.qty,
      unitnam: item.unitnam,
      whdes: item.whdes,
    }));
    return tempData;
  }
}
