import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AccountComponent } from './account.component';
import { SettingsComponent } from './settings/settings.component';
import { Overview2Component } from './overview2/overview2.component';
import { Settings2Component } from './settings2/settings2.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'overview2',
        component: Overview2Component,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'settings2',
        component: Settings2Component,
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
