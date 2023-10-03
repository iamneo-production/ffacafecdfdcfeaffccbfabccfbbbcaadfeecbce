import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let service: AdminflowserviceService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      imports: [HttpClientModule, BrowserAnimationsModule, SharedModule],
      providers: [AdminflowserviceService],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Week4_Day4_should create Payments component', () => {
    expect(component).toBeTruthy();
  });

  it('Week4_Day4_should call the applyFilter method', () => {
    let dialogData = spyOn(component, 'applyFilter').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week4_Day4_should call the getPaymentData method', () => {
    let dialogData = spyOn(component, 'getPaymentData').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week4_Day4_should call ngOnit to subscribe getPayment using services', () => {
    let eventServiceMock = spyOn(component, 'getPaymentData').and.callThrough()
    component.ngOnInit();
    fixture.detectChanges();
    expect(eventServiceMock).toHaveBeenCalled()
  })

  it('Week4_Day4_Testing the HTML Element',()=>{
    const fixture = TestBed.createComponent(PaymentsComponent);
    const data = fixture.nativeElement;
    expect(data.querySelector(".payment").textContent).toContain("Payments");
  })


});
