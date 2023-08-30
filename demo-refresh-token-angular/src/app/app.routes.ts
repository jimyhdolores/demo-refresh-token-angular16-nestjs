import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export default [
	{ path: '', component: LoginPageComponent },
	{ path: 'dashboard', component: DashboardPageComponent }
] as Routes;
