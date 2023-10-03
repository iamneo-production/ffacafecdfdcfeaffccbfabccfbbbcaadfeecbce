import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTableComponent } from './select-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';

describe('SelectTableComponent', () => {
  let component: SelectTableComponent;
  let fixture: ComponentFixture<SelectTableComponent>;
  let service: AdminflowserviceService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTableComponent ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Week4_Day4_should create', () => {
    expect(component).toBeTruthy();
  });

  it('Week4_Day4_should call the tableSelected method', () => {
    let dialogData = spyOn(component, 'tableSelected').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  it('Week4_Day4_should call the selectTableNumber method', () => {
    let dialogData = spyOn(component, 'selectTableNumber').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });

  // it('should call the orderFood method', () => {
  //   let dialogData = spyOn(component, 'orderFood').and.callThrough();
  //   fixture.detectChanges();
  //   expect(dialogData).toBeTruthy();
  // });


});
