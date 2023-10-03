import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersService } from 'src/app/Services/users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let service : UsersService;
  let httpTestingController: HttpTestingController;
  let userEmail
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,BrowserAnimationsModule,
        ToastrModule.forRoot(),SharedModule],
      declarations: [ UsersComponent ],
      providers:[UsersService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Week5_Day5_should create user component', () => {
    expect(component).toBeTruthy();
  });

  it('Week5_Day5_should have an initial empty dataSource', () => {
    // Assert that the initial dataSource.data is an empty array
    expect(component.dataSource.data).toEqual([]);
  });

  it('Week5_Day5_should set dataSource.data to a non-empty array', () => {
    const sampleData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    component.dataSource.data = sampleData;
    expect(component.dataSource.data).toEqual(sampleData);
  });
  it('Week5_Day5_should call list of users', () => {
    expect(component.ngOnInit()).toHaveBeenCalledBefore;
    expect(component.getUserList).toHaveBeenCalled
  });
  it('Week5_Day5_should request getAllUsers and receive a response ', () => {
    const mockResponse = { error: false,message:'All Users found successfully'};

    // Make the service call
    service.getAllUsers().subscribe((response) => {
      // Check if the response matches the mock data
      expect(response).toEqual(mockResponse.error);
      expect(response).toEqual(mockResponse.message);
      userEmail = response['data'][0].email
    });

  });
  it('Week5_Day5_should request getUserRatingByEmail and receive a response', () => {
    const mockResponse = { error: false,message:'All Users found successfully'};

    // Make the service call
    service.getUserRatingByEmail(userEmail).subscribe((response) => {
      // Check if the response matches the mock data
      expect(response).toEqual(mockResponse.error);
      expect(response).toEqual(mockResponse.message);
      expect(response['data'][0].email).toEqual(userEmail)
    });

  });

});
