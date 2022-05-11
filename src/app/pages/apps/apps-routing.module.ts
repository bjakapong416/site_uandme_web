import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCusComponent } from './customer/add-cus/add-cus.component';
import { DetailCusComponent } from './customer/detail-cus/detail-cus.component';
import { ReviewCusComponent } from './customer/review-cus/review-cus.component';
import { BillCusComponent } from './customer/bill-cus/bill-cus.component';
import { DetailBillComponent } from './bill/detail-bill/detail-bill/detail-bill.component';
import { AddBillComponent } from './bill/add-bill/add-bill/add-bill.component';
import { AddLimitstockComponent } from './stock/add-limitstock/add-limitstock.component';

import { StockComponent } from './stock/stock.component';
import { StockResolver } from '../_services/stock/stock.resolver';


const routes: Routes = [
  { path: 'stock', component: StockComponent, resolve: { StockResolver: StockResolver } },
  { path: 'stock/addlimit', component: AddLimitstockComponent },
  { path: 'customer', component: CustomerComponent},
  { path: 'customer/:cusId', component: DetailCusComponent},
  { path: 'customer/:cusId/add', component: AddCusComponent},
  { path: 'customer/:cusId/review', component: ReviewCusComponent},
  { path: 'customer/:cusId/cusbill', component: BillCusComponent},
  { path: 'bill', component: BillComponent},
  { path: 'bill/:billId', component: DetailBillComponent},
  { path: 'bill/add', component: AddBillComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
