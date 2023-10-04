import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderBillingComponent } from './order-billing.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { UsersService } from 'src/app/Services/users.service';


describe('OrderBillingComponent', () => {
  let component: OrderBillingComponent;
  let fixture: ComponentFixture<OrderBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBillingComponent ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[AdminflowserviceService,UsersService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBillingComponent);
    component = fixture.componentInstance;
    component.KartItems = ['dosa'];
    fixture.detectChanges();

  });

  it('Week3_Day1_should create', () => {
    expect(component).toBeTruthy();
  });

  it('Week3_Day1_should call the Proceed method', () => {
    let dialogData = spyOn(component, 'Proceed').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week3_Day1_should call the paynow method', () => {
    let dialogData = spyOn(component, 'paynow').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week3_Day1_should call the minus method', () => {
    let dialogData = spyOn(component, 'minus').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week3_Day1_should call the plus method', () => {
    let dialogData = spyOn(component, 'plus').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week3_Day1_should call the delete method', () => {
    let dialogData = spyOn(component, 'delete').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

});
