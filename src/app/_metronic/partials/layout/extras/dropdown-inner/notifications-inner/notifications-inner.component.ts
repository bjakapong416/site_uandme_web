import { Component, HostBinding, OnInit } from '@angular/core';
import { LimitService } from 'src/app/pages/_services/stock/LimitStock.services';
import { LayoutService } from '../../../../../layout';

export type NotificationsTabsType =
  | 'kt_topbar_notifications_1'
  | 'kt_topbar_notifications_2'
  | 'kt_topbar_notifications_3';

@Component({
  selector: 'app-notifications-inner',
  templateUrl: './notifications-inner.component.html',
})
export class NotificationsInnerComponent implements OnInit {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  activeTabId: NotificationsTabsType = 'kt_topbar_notifications_1';
  currLimit: any;
  mainDatas$: any = [];
  count_LS:number = 0;
  count_SO:number = 0;
  constructor(public limitService: LimitService) {
    this.limitService.getAll().subscribe((data: any)=>{
      this.currLimit = data.limitlow;
    });
  }

  ngOnInit(): void {
    this.FUNC_getData();
  }

  setActiveTabId(tabId: NotificationsTabsType) {
    this.activeTabId = tabId;
  }

  FUNC_getData() {
    this.limitService.getAll().subscribe((data: any)=>{
      this.currLimit = data.limitlow;
      this.limitService.getNotiData(this.currLimit).subscribe((data2: any) => {
        this.mainDatas$ = data2;
        this.mainDatas$.forEach((element: any) => {
          const calQty = Math.floor(element.qty / element.packqty);
          element.calQty = calQty;
        });
        console.log(this.mainDatas$);
      });
    });
  }
}