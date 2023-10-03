import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 food=["Corn Bhel","Dill Leaves Pakoda "]
  constructor() { }

  ngOnInit(): void {
  }
  value = 0;

  handleMinus() {
    this.value--;
  }
  handlePlus() {
    this.value++;
  }
}
