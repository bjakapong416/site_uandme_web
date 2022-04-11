import { Component, OnInit } from '@angular/core';
import { StockModels } from '../../_models/stock.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  StockModels: StockModels[];

  readonly Apiurl ="http://128.199.86.71:8000"

  data: []

  test: string

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.getData()

    this.test = "Hello world"

  }

  getData(){

    fetch('http://128.199.86.71:8000/items?limit=10').then(e=>{
      return e.json()
    }).then(e=>{
      console.log(e)
      this.data = e
    })

  }

}
