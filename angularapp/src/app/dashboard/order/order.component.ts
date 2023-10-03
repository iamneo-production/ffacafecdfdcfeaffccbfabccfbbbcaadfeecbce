import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  food = ['Corn Bhel', 'Dill Leaves Pakoda '];
  itemCount = 0;
  allMenuList;
  starterVeg = [];
  starterNonVeg = [];
  mainCourseVeg = [];
  mainCourseNonVeg = [];
  DesertsVeg = [];
  BreverageVeg = [];
  errorMsg;
  desertCount = 0;
  DesertVegForm: FormGroup;
  starterVegForm: FormGroup;
  mainCourseVegForm: FormGroup;
  mainCourseNonVegForm: FormGroup;
  brevegrageForm: FormGroup;
  isSelected: boolean = true;
  isSelectedVeg: boolean = true;
  KartItems=[];
  add = 0
  addTotal = 0;
  newtotal = [];
  constructor(private service: UsersService, private fb: FormBuilder,
    private toastr:ToastrService) {}
  ngOnInit(): void {
    this.DesertVegForm = this.fb.group({
      items: this.fb.array([]),
    });
    this.starterVegForm = this.fb.group({
      items: this.fb.array([]),
      itemNonveg: this.fb.array([]),
    });

    this.mainCourseVegForm = this.fb.group({
      items: this.fb.array([]),
      itemNonveg: this.fb.array([]),
    });
    this.brevegrageForm = this.fb.group({
      items: this.fb.array([]),
    });
    this.service.getAllMenu().subscribe((res) => {
      if (!res['error']) {
        this.allMenuList = res['data'];
        this.errorMsg = null;
        this.allMenuList.forEach((item) => {
          if (item['category'] === 'starter' && item['status'] === 'available') {
            if (item['subCategory'] && item['subCategory'] === 'veg') {
              this.starterVeg.push(item);
              this.itemStarter.push(this.initialStarter());
            } else {
              this.starterNonVeg.push(item);
              this.itemNonVegStarter.push(this.initialStarter());
            }
          } else if (item['category'] === 'main course' && item['status'] === 'available') {
            if (item['subCategory'] && item['subCategory'] === 'veg') {
              this.mainCourseVeg.push(item);
              this.itemMainCourse.push(this.initialMainCourse());
            } else {
              this.mainCourseNonVeg.push(item);
              this.itemMainCourseNonVeg.push(this.initialMainCourse());
            }
          } else if (item['category'] === 'deserts' && item['status'] === 'available') {
            this.DesertsVeg.push(item);
            this.item.push(this.initialDeserts());
          } else if (item['category'] === 'breverage' && item['status'] === 'available') {
            this.BreverageVeg.push(item);
            this.itemBrevegrage.push(this.initialBrevegrage());
          }
        });
      } else {
        this.allMenuList = [];
        this.errorMsg = 'Error!!!';
      }
    });
  }
  initialDeserts(): FormGroup {
    return this.fb.group({
      foodCount: [0],
    });
  }
  get item() {
    return this.DesertVegForm.get('items') as FormArray;
  }
  initialStarter(): FormGroup {
    return this.fb.group({
      foodCount: [0],
    });
  }
  get itemStarter() {
    return this.starterVegForm.get('items') as FormArray;
  }
  get itemNonVegStarter() {
    return this.starterVegForm.get('itemNonveg') as FormArray;
  }
  initialMainCourse(): FormGroup {
    return this.fb.group({
      foodCount: [0],
    });
  }
  get itemMainCourse() {
    return this.mainCourseVegForm.get('items') as FormArray;
  }
  get itemMainCourseNonVeg() {
    return this.mainCourseVegForm.get('itemNonveg') as FormArray;
  }
  initialBrevegrage(): FormGroup {
    return this.fb.group({
      foodCount: [0],
    });
  }
  get itemBrevegrage() {
    return this.brevegrageForm.get('items') as FormArray;
  }
  handleItemAdd(type, index,item) {
    if(localStorage.getItem('token')){
console.log("Type :",type)
console.log("Index",index)
console.log("Item",item)
console.log("this.itemStarter.controls",this.itemStarter.controls)
      if (type == 'desert') {
        this.item.controls[index]['controls']['foodCount'].patchValue(
          this.item.controls[index]['controls']['foodCount'].value + 1
        );
      } else if (type == 'starter-veg') {
        // this.itemStarter.controls[index]['controls']['foodCount'].patchValue(
        //   this.itemStarter.controls[index]['controls']['foodCount'].value + 1
        // );
      }else if (type == 'starter-nonveg') {
        this.itemNonVegStarter.controls[index]['controls']['foodCount'].patchValue(
          this.itemNonVegStarter.controls[index]['controls']['foodCount'].value + 1
        );
      } else if (type == 'main-veg') {
        this.itemMainCourse.controls[index]['controls']['foodCount'].patchValue(
          this.itemMainCourse.controls[index]['controls']['foodCount'].value + 1
        );
      }else if (type == 'main-nonveg') {
        this.itemMainCourseNonVeg.controls[index]['controls']['foodCount'].patchValue(
          this.itemMainCourseNonVeg.controls[index]['controls']['foodCount'].value + 1
        );
      } else {
        this.itemBrevegrage?.controls[index]['controls']['foodCount'].patchValue(
          this.itemBrevegrage?.controls[index]['controls']['foodCount'].value + 1
        );
      }
      const cartItem = this.KartItems.find((c) => c['_id'] === item['_id']);

      if (cartItem) {
        cartItem.count++;
        cartItem.index = index;

      } else {
        this.KartItems.push({ ...item, count: 1,index:index});

      }
      this.newtotal=[]
      this.KartItems.forEach((res)=>{
        let {price, count,name} = res;
        if(name){
          var add =  + (price * count);
        }
        this.newtotal.push(add);
      })
      this.addTotal = 0;
      this.newtotal.forEach(res=>{
       this.addTotal = this.addTotal + res;
      })
    }
    else{
       this.toastr.warning("Please Login");
    }


  }
  handleItemMinus(type, index,item) {
    if(localStorage.getItem('token')){
    if (type.includes('desert')) {
      this.item?.controls[index]['controls']['foodCount'].patchValue(
        this.item?.controls[index]['controls']['foodCount'].value == 0
          ? 0
          : this?.item.controls[index]['controls']['foodCount'].value - 1
      );
    } else if (type == 'starter-veg') {
      this.itemStarter.controls[index]['controls']['foodCount'].patchValue(
        this.itemStarter.controls[index]['controls']['foodCount'].value == 0
          ? 0
          : this.itemStarter.controls[index]['controls']['foodCount'].value - 1
      );
    }else if (type == 'starter-nonveg') {
      this.itemNonVegStarter.controls[index]['controls']['foodCount'].patchValue(
        this.itemNonVegStarter.controls[index]['controls']['foodCount'].value == 0
          ? 0
          : this.itemNonVegStarter.controls[index]['controls']['foodCount'].value - 1
      );
    } else if (type == 'main-veg') {
      this.itemMainCourse.controls[index]['controls']['foodCount'].patchValue(
        this.itemMainCourse.controls[index]['controls']['foodCount'].value == 0
          ? 0
          : this.itemMainCourse.controls[index]['controls']['foodCount'].value -
              1
      );
    }else if (type == 'main-nonveg') {
      this.itemMainCourseNonVeg.controls[index]['controls']['foodCount'].patchValue(
        this.itemMainCourseNonVeg.controls[index]['controls']['foodCount'].value == 0
          ? 0
          : this.itemMainCourseNonVeg.controls[index]['controls']['foodCount'].value -
              1
      );
    } else if (type.includes('breverage')) {
      this.itemBrevegrage.controls[index]['controls']['foodCount'].patchValue(
        this.itemBrevegrage.controls[index]['controls']['foodCount'].value == 0
          ? 0
          : this.itemBrevegrage.controls[index]['controls']['foodCount'].value -
              1
      );
    }
    const cartItemIndex = this.KartItems.findIndex((c) => c['_id'] === item['_id']);
    if (cartItemIndex !== -1) {
      const cartItem = this.KartItems[cartItemIndex];
      if (cartItem.count > 1) {
        cartItem.count--;
      } else {
        this.KartItems.splice(cartItemIndex, 1);
      }
    }
    this.newtotal=[]

    this.KartItems.forEach((res)=>{
      let {price, count,name} = res;
      if(name){
        var add =  + (price * count);
      }
      this.newtotal.push(add);
    })
    this.addTotal = 0;
    this.newtotal.forEach(res=>{
     this.addTotal = this.addTotal + res;
    })
  }
  else{
    this.toastr.warning("Please Login");
  }
}

  handleSubCategory(type, category) {
    if (category == 'starter') {
      type == 'veg'
        ? (this.isSelectedVeg = true)
        : (this.isSelectedVeg = false);
    } else if (category == 'main') {
      type == 'veg' ? (this.isSelected = true) : (this.isSelected = false);
    }
  }
  deleteitem(event){
    this.KartItems.forEach((element,i)=>{
      console.log(element._id,event['item']?._id);
      const type = event['item'].subCategory ? event['item'].category === 'main course' ? 'main' + '-' +event['item'].subCategory : event['item'].category+ '-' +event['item'].subCategory : event['item'].category
      const index = event['item'].index;
      if(i == event.index) this.KartItems.splice(i,1);
      // event['item'].category+ '-' +event['item'].subCategory

      if(element._id === event['item']._id){
        console.log(element);
        console.log(type);

        if (type.includes('desert')) {
          console.log(this.item.controls[index]);

          this.item.controls[index]['controls']['foodCount'].patchValue(0);
        } else if (type == 'starter-veg') {
          this.itemStarter.controls[index]['controls']['foodCount'].patchValue(0
          );
        }else if (type == 'starter-nonveg') {
          this.itemNonVegStarter.controls[index]['controls']['foodCount'].patchValue(0
          );
        } else if (type == 'main-veg') {
          this.itemMainCourse.controls[index]['controls']['foodCount'].patchValue(0
          );
        }else if (type == 'main-nonveg') {
          this.itemMainCourseNonVeg.controls[index]['controls']['foodCount'].patchValue(0
          );
        } else if (type.includes('breverage')) {
          this.itemBrevegrage.controls[index]['controls']['foodCount'].patchValue(0
          );
        }


      }
   });
  }
  Additem(event){
    this.handleItemAdd(event['item'].category+ '-' +event['item'].subCategory,event['item'].index,event['item'])
  }
  minusitem(event){
    this.handleItemMinus(event['item'].category+ '-' +event['item'].subCategory,event['item'].index,event['item'])
  }
  itemStarters(){
    console.log(this.itemStarter.controls['foodcount'].value);

    return this.itemStarter.controls['foodcount'].value
  }


  checkLength(controlName: string) {
    return (formGroup: FormGroup) => {
      if (!formGroup.parent) {
        return null;
      }
      const otpLength = formGroup.parent.get(controlName);
      console.log(otpLength);

      // const otpLength = formGroup.controls[controlName]
      if ((otpLength.value.length )) {
        otpLength.setErrors({
          length: true
        })
      } else {
        otpLength.setErrors({
          length: false
        })
      }
    }
  }


}
