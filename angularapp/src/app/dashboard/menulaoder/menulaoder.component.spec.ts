import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenulaoderComponent } from './menulaoder.component';

describe('MenulaoderComponent', () => {
  let component: MenulaoderComponent;
  let fixture: ComponentFixture<MenulaoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenulaoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenulaoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
