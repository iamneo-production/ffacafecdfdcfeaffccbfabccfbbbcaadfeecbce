import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookinglaoderComponent } from './cookinglaoder.component';

describe('CookinglaoderComponent', () => {
  let component: CookinglaoderComponent;
  let fixture: ComponentFixture<CookinglaoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookinglaoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookinglaoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
