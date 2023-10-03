import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {
  addMenuForm:FormGroup;
  imageList=[]
  foodImg=[{
    id:1,
    path:'../../../../assets/NoPath - Copy (2)@2x.png'
  },{
    id:2,
    path:'../../../../assets/NoPath - Copy (3)@2x.png'
  },{
    id:3,
    path:'../../../../assets/NoPath - Copy (4)@2x.png'
  },{
    id:4,
    path:'../../../../assets/NoPath - Copy@2x.png'
  },{
    id:5,
    path:'../../../../assets/NoPath@2x.png'
  }]
  constructor(private fb:FormBuilder,private service:UsersService,private toastr:ToastrService, private dialogRef: MatDialogRef<AdditemComponent>) { }

  ngOnInit(): void {
    const formControls = {};
    this.foodImg.map((item) => {
      formControls[item.id] = new FormControl(item.path=='../../../../assets/NoPath - Copy (2)@2x.png');
      item["selected"]=false
      return item
    });
    this.addMenuForm = this.fb.group({
      item_name:['',[Validators.required]],
      item_category:['',Validators.required],
      sub_category:['',Validators.required],
      price:['',[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      description:['',[Validators.required,Validators.maxLength(100)]],
      ...formControls
    })


  }
  imageSlected:boolean=false
  selectItem(items) {
    items.selected=!items.selected
    console.log(items.selected);

    this.foodImg.forEach((item) => {
      this.addMenuForm.get(`${item.id}`)?.setValue(item === items ? item.path : false);
    });
  }
  handleItemAdd(){
    if(this.addMenuForm.valid){
      const item={
        "name":this.addMenuForm.get('item_name').value,
        "category":this.addMenuForm.get('item_category').value,
        "subCategory":this.addMenuForm.get('sub_category').value,
        "status":"available",
        "description":this.addMenuForm.get('description').value,
        "price":this.addMenuForm.get('price').value
    }
    for(let i=1; i<=5; i++){
      if(this.addMenuForm.get(`${i}`).value && this.addMenuForm.get(`${i}`).value !==true && this.addMenuForm.get(`${i}`).value !==false)
      {
        item['imgPath']=this.addMenuForm.get(`${i}`).value
      }
    }

    this.service.addMenu(item).subscribe(res=>{
      if(!res['error']){
        this.toastr.success(res['message']);
        this.dialogRef.close();
      }else{
        this.toastr.error(res['message'])
      }
    })
    }
  }
}
