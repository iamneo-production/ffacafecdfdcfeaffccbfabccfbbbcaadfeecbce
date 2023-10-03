import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  //storing user email in localstorage
  storeUserEmail(email){
    localStorage.setItem('email',email);
  }
  //Getting user email from the localstorage
  getUserEmail(){
    return localStorage.getItem('email');
  }

  //registering the user
  registerUser(user){
     return this.http.post(`${environment.baseUrl}/user/register`,user);
  }

  //user login
  loginUser(user){
    return this.http.post(`${environment.baseUrl}/user/login`,user);
  }
getOrderReview(id){
  return this.http.get(`${environment.baseUrl}/user/order/review/${id}`)
}
  //otp verification
  verifyOtp(val){
    return this.http.post(`${environment.baseUrl}/user/verifyotp`,val);
  }
  //getItemsList
  getAllMenu(){
    return this.http.get(`${environment.baseUrl}/restaurant/getAllMenu`);
  }
  makePayment(val){
    return this.http.post(`${environment.baseUrl}/user/payment`,val);
  }
  giverating(val){
    return this.http.post(`${environment.baseUrl}/user/ratings`,val);
  }
  placeOrder(val){
    return this.http.post(`${environment.baseUrl}/user/order`,val);
  }
  addCart(val){
    return this.http.post(`${environment.baseUrl}/user/cart`,val);
  }
  addMenu(data){
    return this.http.post(`${environment.baseUrl}/restaurant/addMenu`,data);
  }
  editMenu(data,id){
    return this.http.put(`${environment.baseUrl}/restaurant/editMenu/${id}`,data);
  }
  getAllUsers(){
    return this.http.get(`${environment.baseUrl}/restaurant/getAllUsers`);
  }
  getRatings(){
    return this.http.get(`${environment.baseUrl}/restaurant/getRatings`);
  }
  getUserRatingByEmail(email){
    return this.http.post(`${environment.baseUrl}/restaurant/getRatingsByEmail`,{
      email:email
    });
  }
  bookTable(data){
    return this.http.post(`${environment.baseUrl}/user/bookTable`,data)
  }
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }
}
