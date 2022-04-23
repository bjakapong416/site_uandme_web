import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';


//Modules
import { AppsRoutingModule } from './apps-routing.module';
import { MaterialModule } from '../_models/material.module';
// import { NgxPaginationModule } from 'ngx-pagination';

//Resolver
import { StockResolver } from '../_services/stock/stock.resolver';
import { StockService } from '../_services/stock/stock.service';

//Component
import { StockComponent } from './stock/stock.component';
import { CustomerComponent } from './customer/customer.component';
import { BillComponent } from './bill/bill.component';
import { CrudStocksComponent } from './crud-stocks/crud-stocks.component';
import { AddComponent } from './crud-stocks/add/add.component';
import { EditComponent } from './crud-stocks/edit/edit.component';
import { AddCusComponent } from './customer/add-cus/add-cus.component';
import { DetailCusComponent } from './customer/detail-cus/detail-cus.component';
import { ReviewCusComponent } from './customer/review-cus/review-cus.component';
import { BillCusComponent } from './customer/bill-cus/bill-cus.component';

//Pipes



@NgModule({
  declarations: [
    StockComponent,
    CustomerComponent,
    BillComponent,
    CrudStocksComponent,
    AddComponent,
    EditComponent,
    AddCusComponent,
    DetailCusComponent,
    ReviewCusComponent,
    BillCusComponent,
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    InlineSVGModule
  ],
  providers: [
    StockService,
    StockResolver,
  ]
})
export class AppsModule { }
