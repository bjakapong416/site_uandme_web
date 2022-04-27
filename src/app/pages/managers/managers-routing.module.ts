import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { StockComponent } from './stock/stock.component';
import { UserComponent } from './user/user.component';
import { AdduserComponent } from './user/register/adduser/adduser.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent},
  { path: 'stock', component: StockComponent},
  { path: 'user', component: UserComponent},
  { path: 'user/sign-in', component: AdduserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagersRoutingModule { }
