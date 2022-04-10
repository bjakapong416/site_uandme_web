import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagersRoutingModule } from './managers-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { StockComponent } from './stock/stock.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    CustomerComponent,
    StockComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ManagersRoutingModule
  ]
})
export class ManagersModule { }
