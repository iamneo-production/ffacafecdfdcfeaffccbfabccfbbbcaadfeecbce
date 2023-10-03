import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminflowRoutingModule } from './adminflow-routing.module';
import { AdminflowComponent } from './adminflow.component';
import { HomeComponent } from './home/home.component';

import { TablesComponent } from './tables/tables.component';
import { UsersComponent } from './users/users.component';
import { PaymentsComponent } from './payments/payments.component';
import { SharedModule } from '../shared/shared.module';
import { AdditemComponent } from './modal/additem/additem.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [AdminflowComponent, HomeComponent,TablesComponent, UsersComponent, PaymentsComponent, AdditemComponent,MenuComponent],
  imports: [
    CommonModule,
    AdminflowRoutingModule,
    SharedModule
  ]
})
export class AdminflowModule { }
