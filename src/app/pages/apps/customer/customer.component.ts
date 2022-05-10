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
    'finan',
    'balance',
    'status_cus',
    'action',
  ];
  dataSource = new MatTableDataSource();

  mainDatas$: CustomerModels[] = [];
  selectedItemsList: any = [];

  constructor(
    // private route: ActivatedRoute,
    // private authService: AuthService,
    // private router: Router,
    private modalService: NgbModal,
    public customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.FUNC_getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let textSearch = '';
      for (var key in data) {
        if(key == 'cusstatus') {
          if(data[key] == '0') textSearch+='ต่ำ';
          else if(data[key] == '1') textSearch+='กลาง';
          else if(data[key] == '2') textSearch+='สูง';
        } else {
          textSearch += data[key];
        }
      }
      let searchStr = (textSearch).toLowerCase();
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
}
