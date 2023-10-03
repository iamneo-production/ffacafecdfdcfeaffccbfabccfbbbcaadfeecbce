import { viewClassName } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminflowserviceService } from 'src/app/Services/adminflowservice.service';
import { SelectTablePopoverComponent } from './select-table-popover/select-table-popover.component';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.scss']
})
export class SelectTableComponent implements OnInit {
@ViewChildren('selecttablenumber') tablenumber:ElementRef;
  selectedTableId:any;
  content=false
  loader=true
  selectedImage:boolean=false
  tableno
  BreverageVeg = [];
  constructor(public dialog: MatDialog,private router:Router,private servcie:AdminflowserviceService,private toster:ToastrService,private userService:UsersService) { }

  ngOnInit(): void {
    this.selectTable()
  this.tablenumberData=JSON.parse(localStorage.getItem('tableNumber')) ? JSON.parse(localStorage.getItem('tableNumber')) : [];
  console.log(this.tablenumberData);




  }

  selectTableForm=new FormGroup({
    email:new FormControl('',[Validators.required,]),
  })
  tableSelected(event){
    console.log(event.target);

  }
  tableData=[];
  imageSrc:any=[]
  table1bookedImage=["../../../assets/selected4chair.png","../../../assets/bookedtwoverticalseats.svg"];
  table1occupiedImage=["../../../assets/occupied4verticalseats.svg","../../../assets/selected4chair.png"];
  table1vaccantImage=["../../../assets/selected4chair.png","../../../assets/vaccant4seats.svg"];

  table2bookedImage=["../../../assets/selected6chair.png","../../../assets/booked6verticalseats.svg"];
  table2occupiedImage=["../../../assets/selected6chair.png","../../../assets/occupied6horizontalseats.svg"];
  table2vaccantImage=["../../../assets/selected6chair.png","../../../assets/vaccant6seats.svg"];


  table3bookedImage=["../../../assets/selected2chair.png","../../../assets/booked2horizontalseats.svg"];
  table3occupiedImage=["../../../assets/selected2chair.png","../../../assets/occupied2horizontalseats.svg"];
  table3vaccantImage=["../../../assets/selected2chair.png","../../../assets/vaccant2horizontalseats.svg"];

  selectTable(){
     this.servcie.selectTable().subscribe((res)=>{
        if(!res.error){
          this.tableData=res.data.map(res=>{

            res['selected'] = false
            res['tableNo'] = res.tableNo[0]
                        return res
          })
          // res.data.forEach((val)=>{
          //    if(val.booked){
          //      this.tablenumberData.push(val.tableNo)
          //    }
          // })


          console.log(this.tableData,"tableData");

          this.toster.success(res.message)
        }else{
           this.toster.error(res.message)
        }

     },(err)=>{
      if(err.status){
         this.toster.error(err.error)
      }
     })
  }
  tablenumberData:any=[]
  selecttablenumber


  selectTableNumber(num,index){
    if (!num?.booked && num?.alloted === false) {
      num.selected = !num.selected
      if (this.tablenumberData?.length > 0) {
        this.tablenumberData?.forEach((res,i)=>{

          console.log(num.selected,res , num.tableNo);
          if (res == num.tableNo && num.selected == false ) {

            this.tablenumberData.splice(i,1)
            return
          }else if (res != num.tableNo && num.selected) {

            this.tablenumberData.push(num.tableNo);
          }
        })
      }else{
        if (!this.tablenumberData) {
          this.tablenumberData = [];
        }
        this.tablenumberData.push(num.tableNo);
      }

      this.tablenumberData =  [...new Set(this.tablenumberData)]
      console.log(this.tablenumberData,"tablenumberData");

    }

  }

openSetTimeModal(){
  const selectedTableId = []
  console.log(this.tablenumberData);
  this.tablenumberData.forEach(res=>{
    this.tableData.forEach(ele=>{
      if(ele['tableNo']===res){
        selectedTableId.push(ele['_id'])
      }
    })
  })
  const dialogRef = this.dialog.open(SelectTablePopoverComponent,{
    width:'30%',
    panelClass:'addItem-dialog'
  })
  this.userService.sendData({ id: selectedTableId, tableNo:this.tablenumberData });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
