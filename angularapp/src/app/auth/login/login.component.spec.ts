import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule,BrowserAnimationsModule,RouterTestingModule,ReactiveFormsModule,FormsModule],
      providers: [AdminflowserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Week2_day1_should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('Week2_day1_test for username field',()=>{
    const username=component.loginForm.controls.email;
    fixture.detectChanges()
    expect(username.valid).toBeFalsy();
  })

  it('Week2_day1_test for password field',()=>{
    const password =component.loginForm.controls.password;
    fixture.detectChanges()
    expect(password.valid).toBeFalsy();
  })

  it('Week2_day1_should call onSubmit method', () => {
    component.loginForm.controls.email.setValue('test@gmail.com');
    component.loginForm.controls.password.setValue('Test@1234');
    let spy=spyOn(component, 'onSubmit').and.callThrough()
    component.onSubmit();
    fixture.detectChanges();
    let submitButon=fixture.debugElement.query(By.css('.submitbtn'));
    console.log(submitButon,"Submit button");
    submitButon.triggerEventHandler('click',null);
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
