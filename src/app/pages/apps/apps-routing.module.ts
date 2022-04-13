import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { AddComponent } from './crud-stocks/add/add.component';
import { CrudStocksComponent } from './crud-stocks/crud-stocks.component';
import { EditComponent } from './crud-stocks/edit/edit.component';
import { CustomerComponent } from './customer/customer.component';
import { StockComponent } from './stock/stock.component';
import { StockResolver } from '../_services/stock/stock.resolver';

const routes: Routes = [
  { path: 'stock', component: StockComponent, resolve: { StockResolver: StockResolver } },
  { path: 'customer', component: CustomerComponent},
  { path: 'bill', component: BillComponent},
  { path: 'crud-stocks', component: CrudStocksComponent, resolve: { StockResolver: StockResolver } },
  { path: 'crud-stocks/add', component: AddComponent },
  { path: 'crud-stocks/:stockId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
