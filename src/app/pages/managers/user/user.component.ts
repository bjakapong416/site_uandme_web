import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModels } from '../../_models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user/user.service';
import { AuthService } from 'src/app/modules/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdduserComponent } from './register/adduser/adduser.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  avar$:string[] | null = null;

  userTotal$:string | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['avart','name', 'emp_id', 'email', 'job', 'last_login', 'action'];
  dataSource = new MatTableDataSource();
  mainDatas$: UserModels[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public userService: UserService , private modalService: NgbModal) { }

  ngOnInit(): void {
    this.FUNC_getData()
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

  FUNC_getData() {
    this.userService.getAll().subscribe((data: any)=>{    
      this.dataSource = new MatTableDataSource(data);
      this.userTotal$ = data.length;
       

      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    })
  }

  FUNC_Delete(id: string){
    this.userService.delete(id).subscribe(res => {
         this.mainDatas$ = this.mainDatas$.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }

  signin() {
    const modalRef = this.modalService.open(AdduserComponent, { size: 'x1' });
    
  }


}