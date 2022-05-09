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

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'name_cus',
    'tel',
    'area',
    'finan',
    'balance',
    'status_cus',
    'action',
  ];
  dataSource = new MatTableDataSource();

  mainDatas$: CustomerModels[] = [];
  selectedItemsList: any = [];


  constructor(
    private modalService: NgbModal,
    public customerService: CustomerService

  ) {}

  ngOnInit(): void {
    this.FUNC_getData();
  }


  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      //let searchTerms = JSON.parse(filter);
      let searchStr = (data.cuscod + data.cusnam + data.telnum + data.areades + data.creditamt + data.creditbal + 'high').toLowerCase();
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

  FUNC_EditCus(id: any) {
    const modalRef = this.modalService.open(ConfigCusComponent, {
      size: 'x1',
      centered: true,
    });
    modalRef.componentInstance.uid = id;
  }



  FUNC_getData() {
    this.customerService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.dataSource.filteredData.forEach((element: any, index) => {
        if (index < 3) element.isChecked = true;
        else element.isChecked = false;
      });

      this.fetchSelectedItems();
    });
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


}
