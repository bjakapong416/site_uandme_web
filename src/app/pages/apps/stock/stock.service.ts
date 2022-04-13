import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';


import { StockModels } from '../../_models/stock.model';

@Injectable({ providedIn: 'root' })
export class stockService {

    readonly Apiurl ="http://128.199.86.71:8000";
    constructor(private http: HttpClient) { }
    model: any[] = [];


    async getItem(){
        // return this.http.get<StockModels[]>(this.Apiurl + '/allitems').pipe(timeout(5000));
        return this.http.get<StockModels[]>(this.Apiurl + '/allitems').toPromise();


    }




}