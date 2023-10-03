

import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name','email','phoneNo', 'rating'];
  dataSource = new MatTableDataSource();
  users: any[] = [];
  ratings: any[] = [];
  userRatings: any[] = [];
  error
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:UsersService,private toastr:ToastrService) {
   }

  ngOnInit(): void {
    this.getUserList();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUserList(){
    this.service.getAllUsers().subscribe(res=>{
      if(!res['error']){
        this.users = res['data']
        this.users = this.users.map(res=>{
          this.service.getUserRatingByEmail(res['email']).subscribe(rate=>{
            const sum = rate['data'].reduce((accumulator, currentValue) => {
              return accumulator + currentValue.rating;
            }, 0);
            res['rating'] = sum && sum !=='' ? +sum/rate['data'].length:'';
          })
            return res
        })

        if(this.users.length>0) this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.error = null
      }else{
        this.error = "No Data Found"
      }
    },err=>{
      this.toastr.error(err.error.detail)
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

