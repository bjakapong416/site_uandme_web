import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_models/material.module';
import { InlineSVGModule } from 'ng-inline-svg';
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
    InlineSVGModule,
    MaterialModule,
    ManagersRoutingModule
  ]
})
export class ManagersModule { }
