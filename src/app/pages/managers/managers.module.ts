import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_models/material.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ManagersRoutingModule } from './managers-routing.module';

import { CustomerComponent } from './customer/customer.component';
import { StockComponent } from './stock/stock.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { WidgetsModule } from '../../_metronic/partials';
import { AdduserComponent } from './user/register/adduser/adduser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerComponent,
    StockComponent,
    UserComponent,
    AdduserComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    MaterialModule,
    ManagersRoutingModule,
    SharedModule,
    WidgetsModule,
    ReactiveFormsModule
  ]
})
export class ManagersModule { }
