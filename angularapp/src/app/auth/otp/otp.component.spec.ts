import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { OtpComponent } from './otp.component';

describe('OtpComponent', () => {
  let component: OtpComponent;
  let fixture: ComponentFixture<OtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpComponent ],
      imports: [HttpClientTestingModule,BrowserAnimationsModule,RouterTestingModule,ReactiveFormsModule,FormsModule,SharedModule,ToastrModule.forRoot(),NgOtpInputModule],
      providers: [AdminflowserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create otp component', () => {
    expect(component).toBeTruthy();
  });

  it('test for otp email field',()=>{
    const email=component.otpForm.controls.email;
    fixture.detectChanges()
    expect(email.valid).toBeTruthy();
  })

  it('test for otp field',()=>{
    const otpdata = component.otpForm.controls.otp;
    fixture.detectChanges()
    expect(otpdata.valid).toBeFalsy();
  })

  it('should call onSubmit method otp', () => {
    component.otpForm.controls.email.setValue('test@gmail.com');
    component.otpForm.controls.otp.setValue('1234');
    let spy=spyOn(component, 'onSubmit').and.callThrough()
    component.onSubmit();
    fixture.detectChanges();
    let submitButon=fixture.debugElement.query(By.css('.btn'))
    submitButon.triggerEventHandler('click',null)
    expect(component.onSubmit).toHaveBeenCalled()
  });

});
