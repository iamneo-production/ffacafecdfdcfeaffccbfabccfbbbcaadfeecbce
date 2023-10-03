import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  tableForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AdminflowserviceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tableForm = this.fb.group({
      table: this.fb.array([this.initialTable()]),
    });
    this.getTableLists();
  }
  get tables() {
    return this.tableForm.get('table') as FormArray;
  }
  initialTable(): FormGroup {
    return this.fb.group({
      tableNo: [''],
      isAvailable: [''],
      alloted: [''],
      served: [''],
      booked: [''],
      id: [''],
    });
  }
  setExistingTeble(exisitingData): FormArray {
    const formArray = new FormArray([]);
    exisitingData.forEach((element, index) => {
      formArray.push(
        this.fb.group({
          tableNo: [element.tableNo],
          isAvailable: [element.isAvailable],
          alloted: [element.alloted],
          booked: [element.booked],
          served: [element.served],
          id: [element['_id']],
        })
      );
    });
    return formArray;
  }
  handleAddTable() {
    const data = this.fb.group({
      tableNo: [`${this.tables.length + 1}`],
      isAvailable: [true],
      alloted: [false],
      served: [false],
      booked: [false],
    });
    this.service.addTable({ ...data.value }).subscribe(
      (res) => {
        if (!res['error']) {
          this.toastr.success(res['message']);
          this.getTableLists();
        } else {
          this.toastr.error(res['message']);
        }
      },
      (err) => {
        this.toastr.error(err.error.detail);
      }
    );
  }
  getTableLists() {
    this.service.selectTable().subscribe(
      (res) => {
        if (!res['error']) {
          this.tableForm.setControl(
            'table',
            this.setExistingTeble(res['data'])
          );
        } else {
          this.toastr.error(res['message']);
        }
      },
      (err) => {
        this.toastr.error(err.error.detail);
      }
    );
  }
  editTables(index) {
    console.log('edit called');

    const data = {
      _id: this.tables.controls[index]['controls']['id'].value,
      isAvailable: this.tables.controls[index]['controls']['isAvailable'].value,
      alloted: this.tables.controls[index]['controls']['alloted'].value,
      booked: this.tables.controls[index]['controls']['booked'].value,
      served: this.tables.controls[index]['controls']['served'].value,
    };
    this.service.editTable(data).subscribe(
      (res) => {
        if (!res['error']) {
          this.toastr.success(res['message']);
          this.getTableLists();
        } else {
          this.toastr.error(res['message']);
        }
      },
      (err) => {
        this.toastr.error(err.error.detail);
      }
    );
  }
}
