import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modules
import { AppsRoutingModule } from './apps-routing.module';

//Component
import { StockComponent } from './stock/stock.component';
import { CustomerComponent } from './customer/customer.component';
import { BillComponent } from './bill/bill.component';
import { CrudStocksComponent } from './crud-stocks/crud-stocks.component';
import { AddComponent } from './crud-stocks/add/add.component';
import { EditComponent } from './crud-stocks/edit/edit.component';

@NgModule({
  declarations: [
    StockComponent,
    CustomerComponent,
    BillComponent,
    CrudStocksComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppsModule { }
