import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTablePopoverComponent } from './select-table-popover.component';

describe('SelectTablePopoverComponent', () => {
  let component: SelectTablePopoverComponent;
  let fixture: ComponentFixture<SelectTablePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTablePopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTablePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
