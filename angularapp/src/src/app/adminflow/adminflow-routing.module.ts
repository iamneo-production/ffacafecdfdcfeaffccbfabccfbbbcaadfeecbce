import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminflowComponent } from './adminflow.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { PaymentsComponent } from './payments/payments.component';
import { TablesComponent } from './tables/tables.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',component:DashboardComponent},
  { path: '', component: AdminflowComponent,children:[
  {path:'users',component:UsersComponent},
  {path:'dashboard',component:HomeComponent},
  {path:'payment',component:PaymentsComponent},
  {path:'tables',component:TablesComponent},
  {path:'menuitems',component:MenuComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminflowRoutingModule { }
