import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, tap, throwError } from "rxjs";

@Injectable()

export class HttpHandlerService{
  apiUrl = 'https://leave-management-2c12f-default-rtdb.asia-southeast1.firebasedatabase.app/user-data.json';
  leaveUrl =  'https://leave-management-2c12f-default-rtdb.asia-southeast1.firebasedatabase.app/leave-data.json';
  users : any;

  constructor(private http : HttpClient){}

  register(userObj : any){
    return this.http.post(this.apiUrl, userObj)
  }

  updateLeaveById(leveObj : any){
    return this.http.patch('https://leave-management-2c12f-default-rtdb.asia-southeast1.firebasedatabase.app/leave-data/'+leveObj.id+'.json', leveObj)
  }

  getLeaveById(id : any){
    return this.http.get('https://leave-management-2c12f-default-rtdb.asia-southeast1.firebasedatabase.app/leave-data/'+id+'.json')
  }

  getLeaveByStaffId(staffId :any){
    return this.http.get('https://leave-management-2c12f-default-rtdb.asia-southeast1.firebasedatabase.app/leave-data/'+staffId+'.json')
  }

  updateUserById(userObj : any){
    return this.http.patch('https://leave-management-2c12f-default-rtdb.asia-southeast1.firebasedatabase.app/user-data/'+userObj.id+'.json', userObj)
  }

  getUser(){
    return this.http.get(this.apiUrl).pipe(map((userData : any)=>{
      let arr = [];
      for(let user in userData){
        arr.push({...userData[user], id: user})
      }
      this.users = arr;
      return arr
    }),
      catchError((errD : any) => {
              return throwError(errD.message)
            })
          )
  }

  getCurrentUser(){
    return localStorage.getItem('user')

  }

  leaveApply(leaveObj : any){
    return this.http.post(this.leaveUrl, leaveObj)
  }

  getLeaves(){
    return this.http.get(this.leaveUrl).pipe(map((leaveData : any)=>{
      let arr = [];
      for(let leave in leaveData){
        arr.push({...leaveData[leave],  leaveId: leave})
      }

      return arr
    }),
      catchError((errD : any) => {
              return throwError(errD.message)
            })
          )
  }

}
