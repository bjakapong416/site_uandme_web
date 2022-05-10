import { Component, HostBinding, OnInit } from '@angular/core';
import { StockModels } from 'src/app/pages/_models/stock.model';
import { StockService } from 'src/app/pages/_services/stock/stock.service';
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
  limitlow: number = 10;
  mainDatas$: StockModels[] = [];
  Data$: StockModels[] = [];
  count_LS:number = 0;
  count_SO:number = 0;
  constructor(public stockService: StockService) {}

  ngOnInit(): void {
    this.FUNC_getData();
  }

  setActiveTabId(tabId: NotificationsTabsType) {
    this.activeTabId = tabId;
  }

  FUNC_getData() {
    this.stockService.getAll().subscribe((data: any) => {
      this.mainDatas$ = data;
      data.forEach((element: any) => {
        // if(element.qty == 0) this.count_SO++;
        // else if(element.qty < 10) this.count_LS++;
        if(element.qty < this.limitlow)
          this.Data$.push(element);
      });
      //console.log(this.mainDatas$);
    });
  }
}