import { Injectable } from '@angular/core';
import { User } from '../../modules/auth';

@Injectable({
    providedIn: 'root',
})

export class SemiGuardService {
    userProfile: User | null = null;
    public ActiveRole = {
        dashboard: 1, 
        app_stock: 0, 
        app_cus: 0,
        app_bill: 0,
        mgmt_cus: 0,
        mgmt_user: 0,
    };

    constructor() {
        const userProfile = localStorage.getItem('currentUser$'); 
        if(userProfile) {
            this.userProfile = JSON.parse(userProfile) as User;
        }

        if(this.userProfile?.role != '7' && this.userProfile?.role != '8') {
            this.ActiveRole.app_stock = 1;
        }

        if(this.userProfile?.role != '1' && this.userProfile?.role != '6' && this.userProfile?.role != '10') {
            this.ActiveRole.app_cus = 1;
            this.ActiveRole.app_bill = 1;
        }

        if(this.userProfile?.role == '0' || this.userProfile?.role == '7' || this.userProfile?.role == '8' || this.userProfile?.role == '11') {
            this.ActiveRole.mgmt_cus = 1;
        }

        if(this.userProfile?.role == '0' || this.userProfile?.role == '11') {
            this.ActiveRole.mgmt_user = 1;
        }
    }

    ngOnInit(): void {}

}
  