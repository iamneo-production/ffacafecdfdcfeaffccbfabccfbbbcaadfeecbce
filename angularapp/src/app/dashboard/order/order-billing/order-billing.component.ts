import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { UsersService } from 'src/app/Services/users.service';
import { MenulaoderComponent } from '../../menulaoder/menulaoder.component';
import { LoginmodalComponent } from '../../modal/loginmodal/loginmodal.component';

@Component({
  selector: 'app-order-billing',
  templateUrl: './order-billing.component.html',
  styleUrls: ['./order-billing.component.scss']
})
export class OrderBillingComponent implements OnInit,OnChanges {

  constructor(
    private router: Router,
    private service : UsersService,
    private admionService : AdminflowserviceService,
    private dialog:MatDialog
  ) { }
  showCount:boolean = false;
  billingHeading = 'Order Preview';
  showpaynow = 'proceed';
  @Input() KartItems:any;
  @Input() addTotal : any;
  @Output() deleteitem = new EventEmitter();
  @Output() addItem = new EventEmitter();
  @Output() minusItem = new EventEmitter();
  tokenFlag = localStorage.getItem('token');

  serviceCharge = 50;
  menuItem=[];
  newobj;
  TableNumber;
  ngOnInit(): void {
    this.admionService.gettableNo().subscribe(res=>{
      console.log(res);
      this.TableNumber = parseInt(localStorage.getItem('tableNumber'));

    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('hgfd');
  }

  Proceed(){

    if(localStorage.getItem("token")){
      this.KartItems.forEach((val)=>{
        this.menuItem.push(val._id)
     })
     const formdata ={
       menuItems : this.menuItem,
       customerId:JSON.parse(localStorage.getItem('userData'))['_id'],
       description:"new order",
       totalPrice:300,
       customerName:JSON.parse(localStorage.getItem('userData'))['name'],
     }
     this.service.addCart(formdata).subscribe(res=>{
      this.showpaynow = 'Place Order'
      this.showCount = true;
      this.billingHeading = 'Your Orders'
     })
    }else{
      // this.router.navigate(['/login'])
     const dialogRef=this.dialog.open(LoginmodalComponent)
     dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }




  }
  paynow(){
    this.KartItems.forEach((val)=>{
       this.newobj = {
        '_id' : val._id,
        'name':val.name,
        'type':val.type,
        'description':val.description,
        'price':val.price,
       };
       this.menuItem.push(this.newobj)
    })
    const formdata ={
      menuItems : this.menuItem,
      customerId:JSON.parse(localStorage.getItem('userData'))['_id'],
      description:"new order",
      totalPrice:300,
      tableNo:this.TableNumber,
      status:"placed"
    }
    this.service.placeOrder(formdata).subscribe(res=>{
      this.router.navigate(['/dashboard/paymentgateway'],{
        queryParams: {
          'totalPrice' : this.addTotal,
          'serviceCharge' : this.serviceCharge
        },
      })
    },err=>{
      console.log(err);

    })
  }
  minus(index,item){
    this.minusItem.emit({index,item})

  }
  plus(index,item){
    this.addItem.emit({index,item})
  }
  delete(index,item){
    const sendDelete = {
      index:index,
      item:item
    }

  this.deleteitem.emit(sendDelete);
  }

}
