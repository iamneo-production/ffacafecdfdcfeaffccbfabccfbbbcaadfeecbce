import { JsonPipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginmodalComponent } from '../dashboard/modal/loginmodal/loginmodal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adminflow',
  templateUrl: './adminflow.component.html',
  styleUrls: ['./adminflow.component.scss']
})
export class AdminflowComponent implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private router:Router,private elementRef: ElementRef,private dialog:MatDialog) { }
  // @HostListener('document:click', ['$event.target'])

  email = localStorage?.getItem('email');
  loginTime = localStorage?.getItem('time');
  name = localStorage?.getItem('name');
  // name = localStorage.getItem('userData')['name']
  //  name = JSON.parse(localStorage.getItem('userData')?.['name']);
  ngOnInit(): void {


  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  menuopen:boolean=false
  // dropdownOpen(){
  //    this.menuopen=!this.menuopen
  // }
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
  public onClick(targetElement: any): void {
    const isClickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside) {
      // this.clickOutside.emit();
    }
  }



}
