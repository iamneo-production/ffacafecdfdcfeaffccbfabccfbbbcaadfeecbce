import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { UsersService } from 'src/app/Services/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderBillingComponent } from './order-billing/order-billing.component';



describe('OrderComponent', () => {
  let component: OrderComponent;
  let child : OrderBillingComponent;
  let fixture: ComponentFixture<OrderComponent>;

  let service : UsersService;
  let formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      imports:[HttpClientModule,SharedModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule,CommonModule],
      providers:[ UsersService,
        FormBuilder
      ]
    })
    .compileComponents();
    service = TestBed.inject(UsersService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('Week5_Day5_should create order', () => {
    expect(component).toBeTruthy();
  });

  it('Week5_Day5_should create ng on it order', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  })

  it('Week5_Day5_should open intial Starter Component order', () => {
    let dialogData = spyOn(component, 'initialStarter').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day5_should create ordercomp', () => {
    expect(component).toBeTruthy();
    component.initialStarter();
  })
  it('Week5_Day5_should spy on initialStarter order', () => {
    let dialogData = spyOn(component, 'initialStarter').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
   it('Week5_Day5_should spy on initialDeserts order', () => {
    let dialogData = spyOn(component, 'initialDeserts').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
   it('Week5_Day5_should spy on initialMainCourse order', () => {
    let dialogData = spyOn(component, 'initialMainCourse').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day5_should spy on initialBrevegrage order', () => {
    let dialogData = spyOn(component, 'initialBrevegrage').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week5_Day5_should spy on handleItemAdd order', () => {
    let dialogData = spyOn(component, 'handleItemAdd').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day5_should spy on handleItemMinus order', () => {
    let dialogData = spyOn(component, 'handleItemMinus').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day5_should spy on handleSubCategory order', () => {
    let dialogData = spyOn(component, 'handleSubCategory').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day5_should spy on deleteitem order', () => {
    let dialogData = spyOn(component, 'deleteitem').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day5_should call the add item order', () => {
    let dialogData = spyOn(component, 'Additem').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day5_should spy on order', () => {
    let dialogData = spyOn(component, 'minusitem').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week5_Day5_get the item starter veg order',()=>{
    const news = typeof(component.itemStarter);
    expect(news).toBe('object')
  })
  it('Week5_Day5_get the data of item starter it is array order',()=>{
    const abc = component.itemStarter.value
    expect(abc).toEqual([])
  })




});
