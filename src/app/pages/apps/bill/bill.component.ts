import { Component, OnInit, ViewChild } from '@angular/core';
import { BillModels } from '../../_models/bill.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../_services/bill/bill.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})

export class BillComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name_cus', 'doc_id', 'doc_date', 'name_sale', 'price', 'status_cus', 'action'];
  dataSource = new MatTableDataSource();

  mainDatas$: BillModels[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public billService: BillService) { }

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
    this.billService.getAll().subscribe((data: any)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    })
  }

  FUNC_Delete(id: string){
    this.billService.delete(id).subscribe(res => {
         this.mainDatas$ = this.mainDatas$.filter(item => item.docnum !== id);
         console.log('Post deleted successfully!');
    })
  }

  testConsoleLog(data: any){
    console.log(data)
  }

}
