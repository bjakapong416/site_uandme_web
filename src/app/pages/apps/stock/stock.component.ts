import { Component, OnInit } from '@angular/core';
import { StockModels } from '../../_models/stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  StockModels: StockModels[];

  constructor() { }

  ngOnInit(): void {
  }

}
