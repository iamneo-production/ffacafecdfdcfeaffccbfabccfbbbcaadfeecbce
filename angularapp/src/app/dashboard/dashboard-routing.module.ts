import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SelectTableComponent } from './select-table/select-table.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PaymentmodeComponent } from './paymentmode/paymentmode.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { MergeTableOtpComponent } from './merge-table-otp/merge-table-otp.component';
import { OrderBillingComponent } from './order/order-billing/order-billing.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';

const routes: Routes = [
  {path:'',redirectTo:'order',pathMatch:'full'},
  { path: '', component: DashboardComponent,children:[
    {path:'selecttable',component:SelectTableComponent},
    {path:'paymentmode',component:PaymentmodeComponent},
    {path:'thankyou',component:ThankyouComponent},
    {path:'feedback',component:FeedbackComponent},
    {path:'cart',component:CartComponent},
    {path:'order',component:OrderComponent},
    {path:'orderBilling',component:OrderBillingComponent},
    {path:'mergetableotp',component:MergeTableOtpComponent},
    {path:'paymentgateway',component:PaymentGatewayComponent},

  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
