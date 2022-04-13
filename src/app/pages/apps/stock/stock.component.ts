import { Component, OnInit } from '@angular/core';
import { StockModels } from '../../_models/stock.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { StockService } from '../../_services/stock/stock.service';
import { AuthService } from 'src/app/modules/auth';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  length: Observable<number>;
  lowValue: number = 0;
  highValue: number = 10;


  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: any): void {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  isLoading$: Observable<boolean>;

  StockDatas$: StockModels[] = [];
  StockDatas: Observable<StockModels[]>;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public stockService: StockService) { }

  ngOnInit(): void {

    this.FUNC_getStock();
    this.FUNC_aSync_getStock();

  }
  

  FUNC_getStock() {
    this.stockService.getAll().subscribe((data)=>{
      this.StockDatas$ = data;
      console.log(this.StockDatas$);
    })
  }

  FUNC_aSync_getStock() {
    this.stockService.async_getAll().then((data)=>{
      this.StockDatas = data;
      console.log("aSync: ");
      console.log(this.StockDatas);
    });
  }

  FUNC_DeleteStock(id: string){
    this.stockService.delete(id).subscribe(res => {
         this.StockDatas$ = this.StockDatas$.filter(item => item.itemno !== id);
         console.log('Post deleted successfully!');
    })
  }

  FUNC_DeleteStock_aSync(id: any){
    this.stockService.delete(id).subscribe(res => {
         //this.StockDatas = this.StockDatas.filter((item: any) => item.itemno !== id);
         this.StockDatas = this.StockDatas.pipe(filter((item: any) => item.itemno !== id ));
         console.log('Post deleted successfully!');
    })
  }

  testConsoleLog(data: any){
    console.log(data)
  }

}
