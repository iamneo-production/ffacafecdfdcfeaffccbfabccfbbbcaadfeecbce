import {AfterViewInit, Component, ViewChild,OnInit, ElementRef} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AdditemComponent } from '../modal/additem/additem.component';
import { UsersService } from 'src/app/Services/users.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-menu-items',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'status'];
  dataSource = new MatTableDataSource();
error
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContainer') tableContainer: ElementRef;
  constructor(public dialog: MatDialog,private service:UsersService,private toastr:ToastrService) {
   }

  ngOnInit(): void {
    
    this.getMenuList();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddItem(){
    const dialogRef = this.dialog.open(AdditemComponent,{
      width:'40%',
      panelClass:'addItem-dialog'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getMenuList(){
    this.service.getAllMenu().subscribe(res=>{
      if(!res['error']){
       this.dataSource.data= res['data'].map(ele=>{
          
          if(ele['status']=='available'){
            ele['isSelected']=true;
          }else{
            ele['isSelected'] = false;
          }
          return ele
        })
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
 
  handleAvailablity(row){
    row.isSelected =!row.isSelected;
    const data = {
      "name":row['name'],
      "category":row['category'],
      "status":row.isSelected?'available':'unavailable',
      "price":row['price']
  }
    this.service.editMenu(data,row['_id']).subscribe(res=>{
      if(!res['error']){
        this.toastr.success(res['message']);
        this.getMenuList()
      }else{
        this.toastr.error(res['message'])
      }
    },err=>{
      this.toastr.error(err.error.detail)
    })
  }
}
