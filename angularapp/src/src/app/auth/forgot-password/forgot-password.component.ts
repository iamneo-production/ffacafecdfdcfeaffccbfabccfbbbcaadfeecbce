import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm:FormGroup
  submitted=false
  constructor(private router:Router,private service:AdminflowserviceService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.forgotPasswordForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/)]),
      password:new FormControl('',[Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$")]),
      confirmpassword:new FormControl('',[Validators.required,this.matchPasswordValidator('password')]),
    })
  }


  get ForgotpasswordControl(){
   return this.forgotPasswordForm.controls
  }
verifyEmail:boolean=false
verfyEmailAddress(){
 let emailText= this.forgotPasswordForm.get('email').value
  let obj={
    "email" : emailText
  }
  console.log()
  this.service.verifymail(obj).subscribe((res)=>{
    if(!res.error){
      this.toastr.success(res.message)
      this.verifyEmail=true
    }else{
      this.toastr.error(res.message)
      this.verifyEmail=false
    }
  })

}

isPasswordVisible: boolean = false;
isPasswordVisible2: boolean = false;

togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
}
togglePasswordVisibility2() {
  this.isPasswordVisible2 = !this.isPasswordVisible2;
}
matchPasswordValidator(controlName: string) {
  return (control: any) => {
    if (!control.parent) {
      return null;
    }

    const passwordControl = control.parent.get(controlName);
    const confirmPasswordControl = control.parent.get('confirmpassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value === confirmPasswordControl.value) {
      return null; // Passwords match, return null
    } else {
      return { passwordsNotMatch: true }; // Passwords don't match, return an error object
    }
  };
}
onSubmit(){
  this.submitted=true
  this.service.forgotPassword(this.forgotPasswordForm.value).subscribe((res)=>{
    if(!res.error){
     this.toastr.success(res.message)
     this.forgotPasswordForm.reset();

     this.router.navigate(['\login'])
    }else{
      this.toastr.error(res.message)
    }
  })
}

}
