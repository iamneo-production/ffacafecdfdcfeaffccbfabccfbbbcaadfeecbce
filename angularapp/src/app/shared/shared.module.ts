import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { NgOtpInputModule } from  'ng-otp-input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import { NgbRating, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    MatRadioModule,
    MatTabsModule,
    NgbRatingModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    MatSortModule
  ],
  exports:[
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    MatRadioModule,
    MatTabsModule,
    NgbRatingModule,

    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    MatSortModule
  ]
})
export class SharedModule { }
