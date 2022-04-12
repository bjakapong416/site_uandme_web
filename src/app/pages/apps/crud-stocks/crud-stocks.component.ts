import { Component, OnInit } from '@angular/core';
import { StockModels } from '../../_models/stock.model';
import { StockService } from '../../_services/stock/stock.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-crud-stocks',
  templateUrl: './crud-stocks.component.html',
  styleUrls: ['./crud-stocks.component.scss']
})
export class CrudStocksComponent implements OnInit {
  StockDatas$: StockModels[] = [];
  StockDatas: Observable<StockModels[]>;

  constructor(public stockService: StockService) { }

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
      console.log("aSync: " + this.StockDatas);
      console.log(this.StockDatas);
    })
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
