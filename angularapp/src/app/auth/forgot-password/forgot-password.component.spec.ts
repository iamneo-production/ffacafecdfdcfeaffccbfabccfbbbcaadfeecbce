import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [HttpClientTestingModule,BrowserAnimationsModule,SharedModule,RouterTestingModule,ReactiveFormsModule,FormsModule,ToastrModule.forRoot()],
      providers: [AdminflowserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create forgetpassword', () => {
    expect(component).toBeTruthy();
  });

  it('test for email field forgetpassword',()=>{
    const email=component.forgotPasswordForm.controls.email;
    fixture.detectChanges()
    expect(email.valid).toBeFalsy();
  })

  it('test for password field forgetpassword',()=>{
    const passworddata = component.forgotPasswordForm.controls.password;
    fixture.detectChanges()
    expect(passworddata.valid).toBeFalsy();
  })

  it('test for confirmpassword field forgetpassword',()=>{
    const confirmpassword = component.forgotPasswordForm.controls.confirmpassword;
    fixture.detectChanges()
    expect(confirmpassword.valid).toBeFalsy();
  })

  it('should call onSubmit method forgetpassword', () => {
    component.forgotPasswordForm.controls.email.setValue('test@gmail.com');
    component.forgotPasswordForm.controls.password.setValue('Test@1234');
    component.forgotPasswordForm.controls.confirmpassword.setValue('Test@1234');
    let spy=spyOn(component, 'onSubmit').and.callThrough()
    component.onSubmit();
    fixture.detectChanges();
    let submitButon=fixture.debugElement.query(By.css('.btn'))
    submitButon.triggerEventHandler('click',null)
    expect(component.onSubmit).toHaveBeenCalled()
  });

});
