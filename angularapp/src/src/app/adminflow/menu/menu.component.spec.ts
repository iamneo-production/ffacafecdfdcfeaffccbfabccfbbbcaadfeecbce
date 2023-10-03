import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from 'src/app/Services/users.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service : UsersService;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[SharedModule,HttpClientTestingModule,HttpClientModule,ToastrModule.forRoot(),BrowserAnimationsModule],
      declarations: [ MenuComponent ],
      providers:[UsersService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Week2_Day5_should_create', () => {
    expect(component).toBeTruthy();
  });
  it('Week2_Day5_should_call_the_table_list',()=>{
    expect(component.ngOnInit()).toHaveBeenCalledBefore
    expect(component.getMenuList()).toHaveBeenCalled
  })
  it('Week2_Day5_should_check_for_menu_availability',()=>{
    const row = {
      'selected':true
    }
    expect(component.handleAvailablity(row)).toHaveBeenCalled;
    expect(row.selected).toBeFalse

  })
  it('Week2_Day5_should_call_modal_component',()=>{
    document.getElementById('openModal').click()
    expect(component.openAddItem()).toHaveBeenCalled;
    // expect(modalComponent).toBeTruthy();
  })
  it('Week2_Day5_should_request_and_receive_a_response',()=>{
    const mockResponse = { error: false,message:'all menu items'};

    // Make the service call
    service.getAllMenu().subscribe((response) => {
      // Check if the response matches the mock data
      expect(response).toEqual(mockResponse.error);
    });
  })
});
