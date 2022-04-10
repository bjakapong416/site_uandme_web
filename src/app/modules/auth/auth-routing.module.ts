import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';

import {Register2Component } from './components/register2/register2.component'
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginAsideComponent } from './components/login-aside/login-aside.component';

const routes: Routes = [
  {
      path: 'login-aside',
      component: LoginAsideComponent,
      data: { returnUrl: window.location.pathname },
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login-aside',
        pathMatch: 'full',
      },
      {
        path: 'login-page',
        component: LoginPageComponent,
        data: { returnUrl: window.location.pathname },
      },
      {
        path: 'register2',
        component: Register2Component,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },

      { path: '', redirectTo: '/auth/login-aside', pathMatch: 'full' },
      { path: '**', redirectTo: '/auth/login-aside', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
