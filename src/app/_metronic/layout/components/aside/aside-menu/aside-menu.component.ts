import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../../../../modules/auth';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  userProfile: User | null = null;
  ActiveRole = {
    dashboard: 1, 
    head_app: 0,
    app_stock: 0, 
    app_cus: 0,
    app_bill: 0,
    head_mgmt: 0,
    mgmt_cus: 0,
    mgmt_user: 0,
  };

  constructor() {}

  ngOnInit(): void {
    const userProfile = localStorage.getItem('currentUser$'); 
    if(userProfile) {
      this.userProfile = JSON.parse(userProfile) as User;
    }

    if(this.userProfile?.role != '7' && this.userProfile?.role != '8') {
      this.ActiveRole.head_app = 1; 
      this.ActiveRole.app_stock = 1;
    }

    if(this.userProfile?.role != '1' && this.userProfile?.role != '6' && this.userProfile?.role != '10') {
      this.ActiveRole.head_app = 1; 
      this.ActiveRole.app_cus = 1;
      this.ActiveRole.app_bill = 1;
    }

    if(this.userProfile?.role == '0' || this.userProfile?.role == '7' || this.userProfile?.role == '8' || this.userProfile?.role == '11') {
      this.ActiveRole.head_mgmt = 1;
      this.ActiveRole.mgmt_cus = 1;
    }

    if(this.userProfile?.role == '0' || this.userProfile?.role == '11') {
      this.ActiveRole.head_mgmt = 1;
      this.ActiveRole.mgmt_user = 1;
    }
  }
}
