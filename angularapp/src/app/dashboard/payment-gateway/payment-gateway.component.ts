import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  totalPay = 0;
  paymentMode = 'Credit Card';

  constructor(private router : Router,private service: UsersService, private activatedRoutes: ActivatedRoute,private toastr:ToastrService) { }
@ViewChild('showThankyou') showThankyou:ElementRef;
@ViewChild('triggerfeedBack') triggerfeedBack :ElementRef;
@ViewChild('closefeedback') closefeedback :ElementRef;
imageFlag = true;
upiflag=false;
cashFlag = false;
ewalletFlag = false;
  icons=[
    {
      "svgIcon":'../../../assets/paymentGateway/creditCard.svg'
    },
    {
      "svgIcon":'../../../assets/paymentGateway/cash.svg'
    },
    {
      "svgIcon":'../../../assets/paymentGateway/cash.svg'
    },
    {
      "svgIcon":'../../../assets/paymentGateway/eWallet.svg'
    }
  ];
  starRating = 0;
  totalPrice;
  serviceCharge;
  ngOnInit(): void {
    this.activatedRoutes.queryParams.subscribe((res)=>{
      this.totalPrice = res.totalPrice,
      this.serviceCharge = res.serviceCharge

    })
  }
  paymentCheckOut(){
    this.router.navigate(['/dashboard/feedback'])
  }
  onSubmit(form){
    const formdata = {
      customerId:JSON.parse(localStorage.getItem('userData'))['_id'],
      email:localStorage.getItem('email'),
      rating:this.starRating,
      feedback:form.value.Feedback
    }
    if(form.value.Feedback){
      this.service.giverating(formdata).subscribe(res=>{
        form.reset();
        this.closefeedback.nativeElement.click();
        this.showThankyou.nativeElement.click();
      })

    }else{
      this.toastr.error('please enter the FeedBack!')
    }
  }
  makePayment(){

    const formdata={
      paymentMode:this.paymentMode,
      customerId:JSON.parse(localStorage.getItem('userData'))['_id'],
      email:localStorage.getItem('email'),
      customerName:JSON.parse(localStorage.getItem('userData'))['name'],
      paymentDesc:"new payment",
      totalPrice: +this.totalPrice + +this.serviceCharge,
      phNo:JSON.parse(localStorage.getItem('userData'))['phoneNo'],
      status:"successful"
    }
    this.service.getOrderReview(JSON.parse(localStorage.getItem('userData'))['_id']).subscribe(res=>{
      if(!res['error'] && res['message']=='order found successfully'){
        formdata['orderId'] = res['data']['_id']
        this.service.makePayment(formdata).subscribe(res=>{
          this.triggerfeedBack.nativeElement.click();
        },err=>{
          console.log(err);
        })
      }else{
        this.toastr.error(res['message'])
      }
    },err=>{
      this.toastr.error(err.error.detail)
    })

    console.log(this.paymentMode);

  }
  getSelectedIndex(){

  }
  onTabChange(event){
    if(event.index === 0){
      this.imageFlag = true;
      this.upiflag = false;
      this.cashFlag = false;
      this.ewalletFlag= false
      this.paymentMode = 'Credit Card'
    }else   if(event.index === 1){
      this.imageFlag = false;
      this.upiflag = true;
      this.cashFlag = false;
      this.ewalletFlag= false
      this.paymentMode = 'UPI'
     }else  if(event.index === 2){
      this.imageFlag = false;
      this.upiflag = false;
      this.cashFlag = true;
      this.ewalletFlag= false
      this.paymentMode = 'Cash'
     }else  if(event.index === 3){
      this.imageFlag = false;
      this.upiflag = false;
      this.cashFlag = false;
      this.ewalletFlag= true;
      this.paymentMode = 'eWallet'
    }else{
      this.imageFlag = false;
      this.upiflag = false;
      this.cashFlag = false;
      this.ewalletFlag= true;
    }
  }
  gobacktoorders(){
    this.router.navigate(['/dashboard/order'])
  }

}
