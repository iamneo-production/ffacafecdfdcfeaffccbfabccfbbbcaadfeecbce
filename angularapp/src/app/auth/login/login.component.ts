import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UsersService} from '../../Services/users.service'
import { Router } from '@angular/router';
import {AdminflowserviceService} from '../../Services/adminflowservice.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  submitted = false;
  constructor(private service:AdminflowserviceService,private router:Router,private toastr : ToastrService) { }

  ngOnInit(): void {

    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/)]),
      password:new FormControl('',[Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$")])
    })
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  isPasswordVisible: boolean = false;

togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
}
logindate
logintime
  onSubmit(){
    this.submitted = true;
   this.service.login(this.loginForm.value).subscribe((res)=>{
    console.log("Response : ", res)
    if(!res.error){
      this.loginForm.reset()
      localStorage.setItem('token',res.token)
      localStorage.setItem('role',res.role)
      localStorage.setItem('email',res.email)
      localStorage.setItem('name',res['name']);

      localStorage.setItem('userData',JSON.stringify(res.userData))
      let date=new Date();
      const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1.
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;


  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;


 localStorage.setItem('time',formattedTime)
localStorage.setItem('date',formattedDate)
      if(res.role==='user'){
        this.router.navigate(['/dashboard/selecttable']);
      }
      else if(res.role==='admin'){
        this.router.navigate(['/adminflow/dashboard'])
      }

    }else{
      console.log(res.error);
    }
   },err=>{
    this.toastr.error(err.error.message)
   })
  }

}
