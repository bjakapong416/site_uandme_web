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

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
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
      console.log(this.dataSource);
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
    const modalRef = this.modalService.open(AddCusComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
  }

  details(id: any) {
    const modalRef = this.modalService.open(DetailCusComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.id = id;
  }
}
