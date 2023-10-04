import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdditemComponent } from './additem.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

describe('AdditemComponent', () => {
  let component: AdditemComponent;
  let fixture: ComponentFixture<AdditemComponent>;

  beforeEach(async(() => {
    const mockMatDialogRef = {
      close: jasmine.createSpy('close')
    };
    TestBed.configureTestingModule({
      declarations: [ AdditemComponent ],
      imports: [HttpClientTestingModule,BrowserAnimationsModule,RouterTestingModule,ReactiveFormsModule,FormsModule,ToastrModule.forRoot(),SharedModule],
      providers: [AdminflowserviceService,FormBuilder,
        { provide: MatDialogRef, useValue: mockMatDialogRef },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Week5_Day5_should create', () => {
    expect(component).toBeTruthy();
  });

  it('Week5_Day5_should check itemName formField', () => {
      const itemName = component.addMenuForm.controls['item_name'];
      itemName.setValue(' ');
      expect(itemName.valid).toBeTruthy();
  });


});
