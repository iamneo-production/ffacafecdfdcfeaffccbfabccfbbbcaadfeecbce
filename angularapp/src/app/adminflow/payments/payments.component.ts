
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';




@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'PhNo', 'LastSpent', 'Status'];
  // dataSource;
  error;
  getPaymentResult
  getPaymentCount
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,private service:AdminflowserviceService ) {

   }

  dataSource = new MatTableDataSource();


  ngOnInit(): void {
    this.getPaymentData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getPaymentData(){
     this.service.getPayment().subscribe((res)=>{
       if(!res['error']){
        this.getPaymentResult = res['data']
        const data = res['data'].map(res=>{
          this.service.getPaymentByEmail(res['email']).subscribe(list=>{
            res['LastSpent'] = list['data'][list['data'].length-1].totalPrice

          })
          return res
        })
        let count = 0
        this.getPaymentResult.forEach(element => {
          count = count+element['totalPrice']
        });
        this.getPaymentCount = count
        this.dataSource.data = data
        this.error = null
        this.dataSource.paginator=this.paginator
        this.dataSource.sort = this.sort;

      }else{
        this.error = "No Data Found."
      }

     })
  }

  searchData(event){
    console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.data.length > 0) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      // this.length = this.dataSource.filteredData.length;
      // if (this.dataSource.filteredData.length === 0) {
      //   this.errorMsg = 'No Records Found for Searched Data';
      // } else {
      //   this.errorMsg = null;
      // }
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}




/** Builds and returns a new User. */



