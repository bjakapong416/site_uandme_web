import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerModels } from '../../_models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../_services/customer/customer.service';

import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';

import { ConfigCusComponent } from './config-cus/config-cus.component';

import { MatDatepicker } from '@angular/material/datepicker';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SemiGuardService } from '../../_services/semiGuard.service';
import { User } from '../../../modules/auth';

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          return formatDate(date,'yyyy',this.locale);
      } else {
          return date.toDateString();
      }
  }
}



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class CustomerComponent implements OnInit {
  pipe = new DatePipe('en-US');
  filterValues: any = {"all":"","date":""};
  pickDateValue: any;
  userProfile: User | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
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

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public customerService: CustomerService,
    public semiGuardService: SemiGuardService,
  ) {}

  ngOnInit(): void {
    this.semiGuard = this.semiGuardService.ActiveRole;
    if(!this.semiGuard.mgmt_cus)
      this.router.navigate(['/dashboard']);


    const userProfile = localStorage.getItem('currentUser$'); 
    if(userProfile) {
        this.userProfile = JSON.parse(userProfile) as User;
    }

    this.FUNC_getData();
  }


  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let textSearch = '';
      for (var key in data) {
        if(key == 'cusstatus') {
          if(data[key] == '0') textSearch+='ต่ำ';
          else if(data[key] == '1') textSearch+='กลาง';
          else if(data[key] == '2') textSearch+='สูง';
          else if(data[key] == '999') textSearch+='ห้ามขาย';
          else if(data[key] == '-1') textSearch+='ปิดกิจการ';
        } else {
          textSearch += data[key];
        }
      }
      let searchStr = (textSearch).toLowerCase();
      return searchStr.indexOf(searchTerms.all.toLowerCase()) != -1 && data.lastsale.toLowerCase().indexOf(searchTerms.date) !== -1;
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

  // Called on Filter change
  filterChange(filter: any, event: any) {
    //let filterValues = {}
    if(filter == 'date') {
      let date = event.target.value;
      this.filterValues[filter] = this.pipe.transform(date, 'yyyy') || '';
    } else {
      this.filterValues[filter] = event.target.value
        .trim()
        .toLowerCase();
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }




  FUNC_EditCus(id: any) {
    const modalRef = this.modalService.open(ConfigCusComponent, {
      size: 'x1',
      centered: true,
    });
    modalRef.componentInstance.uid = id;
    modalRef.componentInstance.role = this.userProfile?.role  
  }



  FUNC_getData() {
    this.customerService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      console.log(data);
      this.dataSource.filteredData.forEach((element: any, index) => {
        if (index < 3) element.isChecked = true;
        else element.isChecked = false;
      });

      this.fetchSelectedItems();
    });
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.dataSource.filteredData.filter(
      (value: any) => {
        return value.isChecked;
      }
    );
  }


  setYear(event: Event, datepicker: MatDatepicker<any>) {
    let date = event.toString();
    this.pickDateValue = event;
    this.filterValues['date'] = this.pipe.transform(date, 'yyyy') || '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
    datepicker.close();
  }

}
