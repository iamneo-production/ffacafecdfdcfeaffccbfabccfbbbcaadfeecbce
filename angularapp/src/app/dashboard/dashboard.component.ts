import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginmodalComponent } from '../dashboard/modal/loginmodal/loginmodal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
name:any
email:any
tableno:any
date:any
time:any

  constructor(private router:Router,  private dialog:MatDialog
    ) { }

  ngOnInit(): void {

    this.name=localStorage.getItem('name')
    this.email=localStorage.getItem('email')
    this.tableno=JSON.parse(localStorage.getItem('tableNumber'))
    this.name=JSON.parse(localStorage.getItem('userData'))
    this.date=localStorage.getItem('date')
    this.time=localStorage.getItem('time')


    if(this.email === null){
      this.email = false;

    }
    console.log(this.email);




  }
  menuopen:boolean=false
  dropdownOpen(){
    console.log(456);
     if(localStorage.getItem('token')){
      this.menuopen=!this.menuopen

     }
     else{
      console.log('abcd');

      const dialogRef=this.dialog.open(LoginmodalComponent)
     dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
     }
  }
  logOut(){
    console.log("inside logout");

      localStorage.clear()
      this.router.navigate(['/login'])
  }
}
