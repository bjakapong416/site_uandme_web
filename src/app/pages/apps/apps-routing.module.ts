import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: 'stock', component: StockComponent},
  { path: 'customer', component: CustomerComponent},
  { path: 'bill', component: BillComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
