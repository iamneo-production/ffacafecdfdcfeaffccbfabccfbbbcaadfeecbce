import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SelectTableComponent } from './select-table/select-table.component';
import { SharedModule } from '../shared/shared.module';
import { MenulaoderComponent } from './menulaoder/menulaoder.component';
import { CookinglaoderComponent } from './cookinglaoder/cookinglaoder.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PaymentmodeComponent } from './paymentmode/paymentmode.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { MergeTableOtpComponent } from './merge-table-otp/merge-table-otp.component';
import { OrderBillingComponent } from './order/order-billing/order-billing.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { LoginmodalComponent } from './modal/loginmodal/loginmodal.component';
import{SelectTablePopoverComponent} from './select-table/select-table-popover/select-table-popover.component'

@NgModule({
  declarations: [DashboardComponent, SelectTableComponent, MenulaoderComponent, CookinglaoderComponent, ThankyouComponent, PaymentmodeComponent, FeedbackComponent, CartComponent, OrderComponent, MergeTableOtpComponent,OrderBillingComponent,PaymentGatewayComponent, LoginmodalComponent,SelectTablePopoverComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
