import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UsersService} from '../../Services/users.service'
import { Router } from '@angular/router';
import { AdminflowComponent } from 'src/app/adminflow/adminflow.component';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm:FormGroup
  email:any;
  otp:any;
  otpObj = {"email":"","otp":""};
  emailText:any
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  constructor(private service: AdminflowserviceService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.sendemial.subscribe((res)=>{
      this.emailText=res;
    })
    this.otpForm=new FormGroup({
      otp:new FormControl('',[Validators.required]),
      email:new FormControl('')
    });
  }

  otpValue:any
  onOtpChange(event) {
    this.otpForm.get('otp').setValue(event);
  }

  onSubmit(){
   this.otpForm.get('email').setValue(this.emailText)
   this.service.verifyotp(this.otpForm.value).subscribe((res) => {
    this.ngOtpInputRef.otpForm.reset();
    this.toastr.success(res.message);

    if (!res.error) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      if(res.role==='user'){
        this.router.navigate(['/dashboard/selecttable']);
      }
      else{
        this.router.navigate(['/adminflow/dashboard'])
      }
    }else{
      this.toastr.error(res.message)
    }
  }, err => {
    this.ngOtpInputRef.otpForm.reset()
    this.toastr.error(err.error.message)
  })
  }

}
