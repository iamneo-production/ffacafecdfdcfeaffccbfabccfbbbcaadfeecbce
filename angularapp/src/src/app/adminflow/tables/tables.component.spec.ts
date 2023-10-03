import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesComponent } from './tables.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;
  let service: AdminflowserviceService;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TablesComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AdminflowserviceService, ToastrService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Week5_Day3_should create', () => {
    expect(component).toBeTruthy();
  });

  it('Week5_Day3_should call the getTableLists method', () => {
    let dialogData = spyOn(component, 'getTableLists').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day3_should call the editTables method', () => {
    let dialogData = spyOn(component, 'editTables').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day3_should call the setExistingTeble method', () => {
    let dialogData = spyOn(component, 'setExistingTeble').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });
  it('Week5_Day3_should call the initialTable method', () => {
    let dialogData = spyOn(component, 'initialTable').and.callThrough();
    fixture.detectChanges();
    expect(dialogData).toBeTruthy();
  });



  // it('calling update employee when onSubmit is called', () => {
  //   let spy = spyOn(service.selectTable, 'get').and.returnValue(null);
  //   component.onSubmit();
  //   expect(empService.updateEmployee).toHaveBeenCalled();
  // });

  // it('Testing the getTableLists method',()=>{
  //   const fixture = TestBed.createComponent(TablesComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.getTableLists).toBeTruthy();
  // })

  // it('should call the add item', () => {
  //   let dialogData = spyOn(component, 'editTables').and.callThrough();
  //   fixture.detectChanges();
  //   expect(dialogData).toBeTruthy();
  // });

  // it('should call select table method using services', () => {
  //   let eventServiceMock = spyOn(service, 'selectTable').and.callThrough()
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(eventServiceMock).toHaveBeenCalled()
  // })
});
