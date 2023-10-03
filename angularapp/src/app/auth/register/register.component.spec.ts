import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule,BrowserAnimationsModule,SharedModule,RouterTestingModule,ReactiveFormsModule,FormsModule,ToastrModule.forRoot()],
      providers: [AdminflowserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Week3_day3_should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('Week3_day3_test for email field register',()=>{
    const email=component.registerForm.controls.email;
    fixture.detectChanges()
    expect(email.valid).toBeFalsy();
  })

  it('Week3_day3_test for password field register',()=>{
    const passworddata = component.registerForm.controls.password;
    fixture.detectChanges()
    expect(passworddata.valid).toBeFalsy();
  })

  it('Week3_day3_test for name field register',()=>{
    const name = component.registerForm.controls.name;
    fixture.detectChanges()
    expect(name.valid).toBeFalsy();
  })

  it('Week3_day3_test for phoneNo field register',()=>{
    const phoneNodata = component.registerForm.controls.phoneNo;
    fixture.detectChanges()
    expect(phoneNodata.valid).toBeFalsy();
  })

  it('Week3_day3_test for role field register',()=>{
    const roledata = component.registerForm.controls.role;
    fixture.detectChanges()
    expect(roledata.valid).toBeFalsy();
  })

  it('Week3_day3_should call onSubmit method for register', () => {
    component.registerForm.controls.email.setValue('test@gmail.com');
    component.registerForm.controls.password.setValue('Test@1234');
    component.registerForm.controls.name.setValue('Test');
    component.registerForm.controls.phoneNo.setValue('8748876510');
    component.registerForm.controls.role.setValue('admin');
    let spy=spyOn(component, 'onSubmit').and.callThrough()
    component.onSubmit();
    fixture.detectChanges();
    let submitButon=fixture.debugElement.query(By.css('.btn'))
    submitButon.triggerEventHandler('click',null)
    expect(component.onSubmit).toHaveBeenCalled()
  });

});
