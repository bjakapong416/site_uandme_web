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
import { AddCusComponent } from './customer/add-cus/add-cus.component';
import { DetailCusComponent } from './customer/detail-cus/detail-cus.component';
import { ReviewCusComponent } from './customer/review-cus/review-cus.component';
import { BillCusComponent } from './customer/bill-cus/bill-cus.component';
import { WidgetsModule } from '../../_metronic/partials';
import { NgApexchartsModule } from 'ng-apexcharts';

//Pipes
import { SharedModule } from 'src/app/shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DetailBillComponent } from './bill/detail-bill/detail-bill/detail-bill.component';
import { AddBillComponent } from './bill/add-bill/add-bill/add-bill.component';
import { AddLimitstockComponent } from './stock/add-limitstock/add-limitstock.component';
import { DetailStockComponent } from './stock/detail-stock/detail-stock.component';
import { FileUploadComponent } from './stock/file-upload/file-upload.component';

@NgModule({
  declarations: [
    StockComponent,
    CustomerComponent,
    BillComponent,
    AddCusComponent,
    DetailCusComponent,
    ReviewCusComponent,
    BillCusComponent,
    DetailBillComponent,
    AddBillComponent,
    AddLimitstockComponent,
    DetailStockComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    InlineSVGModule,
    SharedModule,
    TabsModule,
    WidgetsModule,
    NgApexchartsModule,
  ],
  providers: [StockService, StockResolver],
})
export class AppsModule {}
