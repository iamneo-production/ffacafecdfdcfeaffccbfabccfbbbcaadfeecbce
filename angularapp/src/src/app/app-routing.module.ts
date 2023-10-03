import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component'
import { OtpComponent } from './auth/otp/otp.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import {AuthGuard} from './guards/auth.guard'


const routes: Routes = [
  {path:'',redirectTo:"dashboard",pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'otp',component:OtpComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'adminflow', loadChildren: () => import('./adminflow/adminflow.module').then(m => m.AdminflowModule),canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
