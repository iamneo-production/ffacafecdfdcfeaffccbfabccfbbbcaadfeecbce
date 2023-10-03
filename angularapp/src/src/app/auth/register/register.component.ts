import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {UsersService} from '../../Services/users.service'
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData:any;
  submitted:boolean=false
  registerForm:FormGroup
  constructor(private service:AdminflowserviceService,private toastr: ToastrService,
    private router:Router) {}

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/),Validators.minLength(3)]),
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/)]),
      phoneNo:new FormControl('',[Validators.required,Validators.maxLength(10) ]),
      password:new FormControl('',[Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$")]),
      role:new FormControl('',[Validators.required])
    })
  }

  isPasswordVisible: boolean = false;

togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
}
  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted=true
    this.service.sendmailtoOtp(this.registerForm.get('email').value);
   this.service.register(this.registerForm.value).subscribe((res)=>{
    if(!res.error){
      this.toastr.success(res.message)
     this.registerForm.reset()
      this.router.navigate(['/otp'])
    }else {
      this.toastr.error(res.message);
    }
  }, (err) => {
    if (err.status) {
      this.toastr.error(err.error.message);
    } else {
      this.toastr.error('CONNECTION_ERROR');
    }
  });


  }



}
