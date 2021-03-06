import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModels } from '../../_models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user/user.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdduserComponent } from './register/adduser/adduser.component';
import { DeleteComponent } from './delete/delete.component';
import { EdituserComponent } from './edituser/edituser.component';
import { SemiGuardService } from '../../_services/semiGuard.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {
  filterValues: any = {"all":"","role":""};
  filterSelectObj: any = [];
  roles: any[] = [ 
    'CEO ผู้ประกอบการ',
    'Standard',
    'Head of Sale',
    'Sale',
    'Head of Co-Sale',
    'Co-Sale',
    'Stock',
    'Finance 1',
    'Finance 2',
    'ต่างประเทศ 1',
    'ต่างประเทศ 2',
    'Admin System',
  ];

  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  avar$: string[] | null = null;

  userTotal$: string | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'avart',
    'name',
    'emp_id',
    'email',
    'job',
    'last_login',
    'action',
  ];
  dataSource = new MatTableDataSource();
  mainDatas$: UserModels[] = [];
  semiGuard: any = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public userService: UserService,
    private modalService: NgbModal,
    public semiGuardService: SemiGuardService,
  ) {
    this.filterSelectObj = [
      {
        name: 'Job',
        columnProp: 'role',
        options: [],
      },
    ];
   }

  ngOnInit(): void {
    this.semiGuard = this.semiGuardService.ActiveRole;
    if(!this.semiGuard.mgmt_user)
      this.router.navigate(['/dashboard']);
      
    this.FUNC_getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Called on Filter change
  filterChange(filter: any, event: any) {
    //let filterValues = {}
    this.filterValues[filter] = event.target.value
      .trim()
      .toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  FUNC_getData() {
    this.userService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.userTotal$ = data.length;

      this.dataSource.paginator = this.paginator;

      this.filterSelectObj.filter((o: any) => {
        o.options = this.getFilterObject(data, o.columnProp);
      });

      this.dataSource.filterPredicate = this.NEW_createFilter();
      console.log(this.dataSource);
    });
  }

  NEW_createFilter() {
    let dataRole = this.roles;
    let filterFunction = function (data: any, filter: string): boolean {
      let job_Status = dataRole[data.role];
      let searchTerms = JSON.parse(filter);
      let searchStr = (data.fullname + data.phone + data.employee_id + data.email + job_Status + data.lastlogin).toLowerCase();
      return searchStr.indexOf(searchTerms.all.toLowerCase()) != -1 && data.role.toLowerCase().indexOf(searchTerms.role) !== -1 ;
    };
    return filterFunction;
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  FUNC_Delete(id: string) {
    this.userService.delete(id).subscribe((_res) => {
      this.mainDatas$ = this.mainDatas$.filter((item) => item.id !== id);
      console.log('Post deleted successfully!');
    });
  }

  signin() {
    this.modalService.open(AdduserComponent, {
      size: 'x1',
      centered: true,
    });
  }

  FUNC_DeleteUser(id: any, fullname: string, emp_id: string, role: string) {
    const modalRef = this.modalService.open(DeleteComponent, {
      size: 'x1',
      centered: true,
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.fullname = fullname;
    modalRef.componentInstance.emp_id = emp_id;
    modalRef.componentInstance.role = role;
  }


  FUNC_EditUser(id: any, fullname: string, emp_id: string, role: string , email: string , password: string, phone: string) {
    const modalRef = this.modalService.open(EdituserComponent, {
      size: 'x1',
      centered: true,
    });
    modalRef.componentInstance.uid = id;
    modalRef.componentInstance.ufullname = fullname;
    modalRef.componentInstance.uemp_id = emp_id;
    modalRef.componentInstance.urole = role;
    modalRef.componentInstance.uemail = email;
    modalRef.componentInstance.upassword = password;
    modalRef.componentInstance.uphone = phone;    
  }




}
