import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { LimitService } from 'src/app/pages/_services/stock/LimitStock.services';
import { AuthService, UserType, User } from '../../../../modules/auth';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';

  user$: User | null = null;

  name$: string | null = null;
  currLimit: any;
  noti_stats: any = 0;
  constructor(
    private layout: LayoutService,
    public limitService: LimitService,
  ) {}

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;

    // Get user info from localstorage
    const userProfiles = localStorage.getItem('currentUser$');
    if (userProfiles != null) {
      this.user$ = JSON.parse(userProfiles) as User;

      // Split String name
      let text = this.user$.fullname;
      const arr = text.split('');
      this.name$ = arr[0];
    }
    this.FUNC_getData();

    console.log(this.noti_stats);
  }

  FUNC_getData() {
    this.limitService.getAll().subscribe((data: any) => {
      this.limitService.getNotiTF(data.limitlow).subscribe((data2: any) => {
        this.noti_stats = data2[0].stat;
      });
    });
  }
}
