import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminflowComponent } from './adminflow.component';
import { AdminflowserviceService } from '../Services/adminflowservice.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminflowComponent', () => {
  let component: AdminflowComponent;
  let fixture: ComponentFixture<AdminflowComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ AdminflowComponent ],
      providers:[AdminflowserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
