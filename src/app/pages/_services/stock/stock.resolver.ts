import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StockService } from './stock.service';
import { StockModels } from '../../_models/stock.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StockResolver implements Resolve<StockModels[]> {

  constructor(private StockService: StockService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StockModels[]> {
    return this.StockService.getAll();
  }
}
