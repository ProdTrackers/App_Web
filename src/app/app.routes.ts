import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {AccountComponent} from './components/account/account.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegisterComponent} from './components/register/register.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  } ,
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login/reset-password', component: ResetPasswordComponent
  },
  {
    path: '', component: NavbarComponent, children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'account',
        component: AccountComponent
      }
    ]
  }
];
