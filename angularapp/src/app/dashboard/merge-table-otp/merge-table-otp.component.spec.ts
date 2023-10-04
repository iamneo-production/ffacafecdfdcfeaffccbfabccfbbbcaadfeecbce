import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeTableOtpComponent } from './merge-table-otp.component';

describe('MergeTableOtpComponent', () => {
  let component: MergeTableOtpComponent;
  let fixture: ComponentFixture<MergeTableOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeTableOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeTableOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
