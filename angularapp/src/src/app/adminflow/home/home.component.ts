import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getPaymentResult;
  getPaymentCount;
  error;
  totalUsers;
  totalMenuItemsCount;
  totalTablesCount;
  constructor(
    public dialog: MatDialog,
    private service: AdminflowserviceService
  ) {}

  ngOnInit(): void {
    this.getPaymentData();
    this.getUserCount();
    this.getAllMenuCount();
    this.getAllTablesCount();
  }

  getPaymentData() {
    this.service.getPayment().subscribe((res) => {
      if (!res['error']) {
        this.getPaymentResult = res['data'];
        const data = res['data'].map((res) => {
          this.service.getPaymentByEmail(res['email']).subscribe((list) => {
            res['LastSpent'] = list['data'][list['data'].length - 1].totalPrice;
          });
          return res;
        });
        let count = 0;
        this.getPaymentResult.forEach((element) => {
          count = count + element['totalPrice'];
        });
        this.getPaymentCount = count;
        this.error = null;
      } else {
        this.error = 'No Data Found.';
      }
    });
  }

  //Getting all users count
  getUserCount(){
    this.service.getAllUsers().subscribe((res)=>{
      this.totalUsers = res.data.length;
    })
  }

  //Getting all menu items count
  getAllMenuCount(){
    this.service.getAllMenuItems().subscribe((res)=>{
      this.totalMenuItemsCount = res.data.length;
    })
  }

  //Getting all menu items count
  getAllTablesCount(){
    this.service.selectTable().subscribe((res)=>{
      this.totalTablesCount = res.data.length;
    })
  }

}
