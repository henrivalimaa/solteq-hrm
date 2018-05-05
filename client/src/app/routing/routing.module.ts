import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Routes } from '@angular/router';

import { EmployeesComponent } from '../employees/employees.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../guards/auth.guard';

/**
* Application routes
*/
const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/employees', pathMatch: 'full', canActivate: [AuthGuard] },
	{ path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	declarations: []
})

export class RoutingModule { }
