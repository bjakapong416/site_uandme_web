import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel , User , Role } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-aside',
  templateUrl: './login-aside.component.html',
  styleUrls: ['./login-aside.component.scss']
})
export class LoginAsideComponent implements OnInit {

  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  // defaultAuth: any = {
  //   email: '',
  //   password: '',
  // };

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {

    this.hasError = false;
    
    let user = this.f.email.value
    let passwd = this.f.password.value

    console.log(user)
    console.log(passwd)


    const loginSubscr = this.authService
      .login1(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: User | undefined) => {

        console.log(user);
        
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);

  //   const loginSubscr = this.authService
  //   .login(this.f.email.value, this.f.password.value)
  //   .pipe(first())
  //   .subscribe((user: User | undefined) => {

  //     console.log(user);
      
  //     if (user) {
  //       this.router.navigate([this.returnUrl]);
  //     } else {
  //       this.hasError = true;
  //     }
  //   });
  // this.unsubscribe.push(loginSubscr);




  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
