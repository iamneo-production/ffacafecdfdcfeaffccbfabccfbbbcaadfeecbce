import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminflowComponent } from './adminflow/adminflow.component';
import { HomeComponent } from './adminflow/home/home.component';
import { MenuComponent } from './adminflow/menu/menu.component';
import { ModalComponent } from './adminflow/modal/modal.component';
import { PaymentsComponent } from './adminflow/payments/payments.component';
import { TablesComponent } from './adminflow/tables/tables.component';
import { UsersComponent } from './adminflow/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminflowComponent,
    HomeComponent,
    MenuComponent,
    ModalComponent,
    PaymentsComponent,
    TablesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
