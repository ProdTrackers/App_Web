import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {AccountComponent} from './components/account/account.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  { path: 'search', component: SearchComponent, title: 'Search Page' },
  { path: 'account', component: AccountComponent, title: 'Account Page' },
];
