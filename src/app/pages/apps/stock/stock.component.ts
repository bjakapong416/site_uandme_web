import { Component, OnInit, ViewChild } from '@angular/core';
import { StockModels } from '../../_models/stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../_services/stock/stock.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})

export class StockComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterValues: any = {};
  filterSelectObj: any = [];

  displayedColumns: string[] = ['id', 'name', 'type', 'qty', 'unit', 'where', 'action'];
  dispColumns: string[] = ['ID', 'Name', 'Type', 'Qty', 'Unit', 'Where', 'Action'];
  fieldColumns: string[] = ['itemno', 'itemdes', 'itemgrp', 'qty', 'unitnam', 'whdes', 'itemno'];
  dataSource = new MatTableDataSource();
  dataSourceFilters = new MatTableDataSource()
  dataLength = 0;

  p:number = 1;
  lowValue: number = 0;
  highValue: number = 10;


  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: any): void {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  mainDatas$: StockModels[] = [];
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public stockService: StockService) { 
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'Type',
        columnProp: 'itemgrp',
        options: []
      }, {
        name: 'Unit',
        columnProp: 'unitnam',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    this.FUNC_getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  FUNC_getData() {
    this.stockService.getAll().subscribe((data: any)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSourceFilters = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.filterSelectObj.filter((o: any) => {
        o.options = this.getFilterObject(data, o.columnProp);
      });

      this.dataSourceFilters.filterPredicate = this.createFilter();
    })
  }

  FUNC_Delete(id: string){
    this.stockService.delete(id).subscribe(res => {
         this.mainDatas$ = this.mainDatas$.filter(item => item.itemno !== id);
         console.log('Post deleted successfully!');
    })
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
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
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
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.dataSource.filter = JSON.stringify(filterValue.trim().toLowerCase())

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  testConsoleLog(data: any){
    console.log(data)
  }
}
