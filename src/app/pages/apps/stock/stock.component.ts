import { AfterViewInit, Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { StockModels } from '../../_models/stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../_services/stock/stock.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let uniqueArray = Array.from(new Set(value));
    return uniqueArray;
  }
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})

export class StockComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'type', 'qty', 'unit', 'where', 'action'];
  dispColumns: string[] = ['ID', 'Name', 'Type', 'Qty', 'Unit', 'Where', 'Action'];
  fieldColumns: string[] = ['itemno', 'itemdes', 'itemgrp', 'qty', 'unitnam', 'whdes', 'itemno'];
  dataSource = new MatTableDataSource();

  length:number;
  lowValue: number = 0;
  highValue: number = 10;


  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: any): void {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  StockDatas$: StockModels[] = [];
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public stockService: StockService) { 
    this.FUNC_getStock();
  }

  ngOnInit(): void {
    this.FUNC_getStock();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  FUNC_getStock() {
    this.stockService.getAll().subscribe((data: any)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    })
  }

  FUNC_DeleteStock(id: string){
    this.stockService.delete(id).subscribe(res => {
         this.StockDatas$ = this.StockDatas$.filter(item => item.itemno !== id);
         console.log('Post deleted successfully!');
    })
  }

  testConsoleLog(data: any){
    console.log(data)
  }
}
