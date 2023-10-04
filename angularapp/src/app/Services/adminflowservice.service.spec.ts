import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

import { AdminflowserviceService } from './adminflowservice.service';

describe('AdminflowserviceService', () => {
  let service: AdminflowserviceService;
  let httpTestingController: HttpTestingController;
  let baseUrl = "http://localhost:2800"
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
    });
    service = TestBed.inject(AdminflowserviceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created adminService', () => {
    expect(service).toBeTruthy();
  });

  it("should call POST API to create for Login of user", () => {
    service.login({}).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}/user/login` });
    expect(req.request.body).toEqual({});
  });

  it("should call POST API to create for registration of user", () => {
    service.register({}).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}/user/register` });
    expect(req.request.body).toEqual({});
  });

  it("should call POST API to create for Otp Verification for user", () => {
    service.verifyotp({}).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}/user/verifyOTP` });
    expect(req.request.body).toEqual({});
  });

  it("should call POST API to for email Verification for user", () => {
    service.verifymail({}).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}/user/verifyEmail` });
    expect(req.request.body).toEqual({});
  });

  it('should call GET API to select table for user', () => {
    let responseData = {
      error: false,
      message: 'Table selected',
      data:[]
    }
    let spy = spyOn(service, 'selectTable').and.returnValue(of(responseData))
    service.selectTable().subscribe();
    httpTestingController.verify();
    expect(spy).toHaveBeenCalled()
  })

   it("should call PUT API to Reset password for user", () => {
    service.forgotPassword({}).subscribe();
    let req = httpTestingController.expectOne({ method: "PUT", url: `${baseUrl}/user/resetPassword` });
    expect(req.request.body).toEqual({});
  });

  it("should call POST API to for selecting the table for user", () => {
    service.addTable({}).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}/restaurant/addTable` });
    expect(req.request.body).toEqual({});
  });

});
