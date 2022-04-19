import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerModels } from '../../_models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../_services/customer/customer.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name_cus', 'tel', 'area', 'finan', 'balance', 'status_cus', 'action'];
  dataSource = new MatTableDataSource();

  mainDatas$: CustomerModels[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public customerService: CustomerService) { }

  ngOnInit(): void {
    this.FUNC_getData()
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
    this.customerService.getAll().subscribe((data: any)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    })
  }

  FUNC_Delete(id: string){
    this.customerService.delete(id).subscribe(res => {
         this.mainDatas$ = this.mainDatas$.filter(item => item.cuscod !== id);
         console.log('Post deleted successfully!');
    })
  }

}
