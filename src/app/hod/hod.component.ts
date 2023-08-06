import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from '../shared/services/http-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.css']
})
export class HodComponent implements OnInit{
  content: any[] = [];
  userId : any;
  staff : any;


  constructor( private router: Router, private httpServe : HttpHandlerService) { }

  ngOnInit(): void {
    if (localStorage.length === 0) {
      alert('Please enter your login Credentials');
        this.router.navigate(['/login']);
      }

    this.httpServe.getUser().subscribe((data) => {
      for(let user of data){
        this.httpServe.getLeaves().subscribe((leaves)=>{
          for(let sLeave of leaves){
            this.userId = sLeave.staffId;
            if(this.userId === user.id){
              sLeave.fName = user.firstName;
              sLeave.lName = user.lastName;
              this.content.push(sLeave);
            }
          }
        })
      }
    })
  }

  onApprove(lId:any, sId: any, index :number){
    let statusObj = {
          status : 'Approved',
          id : lId
    }
    this.httpServe.updateLeaveById(statusObj).subscribe();
    this.httpServe.getUser().subscribe((res) => {
      this.staff = res.find((user) => user.id === sId);
      let totalLeaves = this.staff.status.totalLeaves
      let totalApprove =this.staff.status.approved;
      this.httpServe.getLeaveById(lId).subscribe((leave : any) => {
        let updateStatus ={
          id : sId,
          "status/totalLeaves":  totalLeaves - leave.noOfDays,
          "status/approved":   leave.noOfDays+totalApprove,
        }
        this.httpServe.updateUserById(updateStatus).subscribe()
      })
    });
    if (index !== -1) {
      this.content.splice(index, 1);
      alert('Leave get Approved');
    }
  }

  onReject(lId:any, sId: any,  index :number){
      let statusObj = {
            status : 'Rejected',
            id : lId
      }
      this.httpServe.updateLeaveById(statusObj).subscribe();
    this.httpServe.getUser().subscribe((res) => {
      this.staff = res.find((user) => user.id === sId);
      let totalDays = this.staff.status.totalLeaves
      let totalReject =this.staff.status.rejected;
      this.httpServe.getLeaveById(lId).subscribe((leave : any) => {
        let updateStatus ={
          id : sId,
          "status/totalLeaves": totalDays-leave.noOfDays,
          "status/rejected":  leave.noOfDays+totalReject,
        }
        this.httpServe.updateUserById(updateStatus).subscribe();
      })
    });
    if (index !== -1) {
      this.content.splice(index, 1);
      alert('Leave get Rejected');
    }
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
