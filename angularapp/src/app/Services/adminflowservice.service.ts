import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminflowserviceService {

  constructor(private http:HttpClient) { }

   sendemial=new BehaviorSubject<string>("")
   selectTableNotoOrderFood=new BehaviorSubject<string>("")
   sendmailtoOtp(data){
     this.sendemial.next(data);
   }
  tableNo(data){
    this.selectTableNotoOrderFood.next(data)
  }
  gettableNo(){
   return this.selectTableNotoOrderFood.asObservable();
  }
   loggedIn() {
    return !!localStorage.getItem('token');
  }
  login(data){
   return this.http.post<{
      error:boolean,
      message:string,
      token:string,
      role:string,
      email:string,
      userData:any
    }>(`${environment.baseUrl}/user/login`,data)
  }
  register(data){
    return this.http.post<{
      error:boolean,
      message:string
    }>(`${environment.baseUrl}/user/register`,data)
  }
  verifyotp(data){
      return this.http.post<{
       error:boolean,
       message:string,
       token:any,
       role:string
      }>(`${environment.baseUrl}/user/verifyOTP`,data)
  }
  verifymail(data){
    return this.http.post<{
      error:Boolean,
      message:string
    }>(`${environment.baseUrl}/user/verifyEmail`,data)
  }

  selectTable(){
    return this.http.get<{
      error:boolean
      message:string
      data:any
    }>(`${environment.baseUrl}/restaurant/table`)
  }
  getPayment(){
    return this.http.get<{
    error:boolean
    message:string
    data:any
    }>(`${environment.baseUrl}/restaurant/getAllPayments`)
  }
  getPaymentByEmail(data){
    return this.http.post<{
    error:boolean
    message:string
    data:any
    }>(`${environment.baseUrl}/restaurant/getPaymentByEmail`,{
      email:data
    })
  }
  forgotPassword(data){
    return this.http.put<{
error:Boolean
message:string

    }>(`${environment.baseUrl}/user/resetPassword`,data)
  }
  addTable(data){
    return this.http.post<{
      error:boolean
      message:string
      data:any
    }>(`${environment.baseUrl}/restaurant/addTable`,data)
  }
  editTable(data){
    return this.http.put<{
      error:boolean
      message:string
      data:any
    }>(`${environment.baseUrl}/restaurant/table/editStatus`,data)
  }

  //Getting all users
  getAllUsers(){
    return this.http.get<{
    error:boolean
    message:string
    data:any
    }>(`${environment.baseUrl}/restaurant/getAllUsers`)
  }

  //Getting all menu items
  getAllMenuItems(){
    return this.http.get<{
    error:boolean
    message:string
    data:any
    }>(`${environment.baseUrl}/restaurant/getAllMenu`)
  }
}
