import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-select-table-popover',
  templateUrl: './select-table-popover.component.html',
  styleUrls: ['./select-table-popover.component.scss']
})
export class SelectTablePopoverComponent implements OnInit {
date='';
maxtime
mintime
enableTimePicker:boolean=false
selectDateDinner:boolean=false
selectDateLunch:boolean=false
selecttoday:boolean=false
selecttmrw:boolean=false
dateTimeValue
receivedData

  constructor(private router:Router, private service:UsersService,private toastr:ToastrService,private AdminSerive:AdminflowserviceService,
    public dialogRef: MatDialogRef<SelectTablePopoverComponent>,
    ) { }

  ngOnInit(): void {
    this.service.data$.subscribe((data) => {
      this.receivedData = data;
    });
    console.log("received data on ngoninit",this.receivedData)
  }
  handleDate(date){
    if(date=='today'){
      this.selecttoday =true
      this.selecttmrw = false
      this.date = new Date().toLocaleString().split(',')[0]
    }
    if(date=='tomorrow'){
      this.selecttmrw = true
      this.selecttoday =false
      var today = new Date();
      var tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      this.date = tomorrow.toLocaleString().split(',')[0];

    }
  }
  handleTime(time){
    this.enableTimePicker =true
    if(time=='lunch'){
      this.selectDateLunch = true
      this.selectDateDinner = false

      this.mintime = '12:00'
      this.maxtime='16:00'
    }else if(time=='dinner'){
      this.selectDateDinner = true
      this.selectDateLunch = false

      this.mintime='18:00'
      this.maxtime='23:00'
    }
  }
  onTimeChange(event){
    console.log(event);
    this.dateTimeValue = event
  }
  onSubmit(){
    console.log(this.receivedData);
    if(this.dateTimeValue && this.date){
      const data ={
    "_id":this.receivedData['id'].join(','),
    "bookingDate":this.date,
    "bookingTime":this.dateTimeValue,
    "booked":true
      }

      this.service.bookTable(data).subscribe(res=>{
        console.log(res);
        this.dialogRef.close();
        this.orderFood();

      })
    }else{
      this.toastr.error("Please select the required fields")
    }
  }
  orderFood(){
    localStorage.setItem('tableNumber',stringify(this.receivedData[1]))
    this.AdminSerive.tableNo(this.receivedData[1])
      this.router.navigate(['/dashboard/order'])
  }
}
