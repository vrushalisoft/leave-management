import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Leave } from 'src/app/shared/model/leave-model';
import { HttpHandlerService } from 'src/app/shared/services/http-handler.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent implements OnInit{
  leaveForm : any;
  userData : any;
  staff : any;
  constructor(private httpServe : HttpHandlerService, private router: Router){}

  ngOnInit(): void {
    this.userData = this.httpServe.getCurrentUser();
    this.staff = JSON.parse( this.userData);

    this.leaveForm = new FormGroup({
        start: new FormControl('',[Validators.required]),
        end: new FormControl('',[Validators.required]),
        reason : new FormControl('', Validators.required)
    });

  }

  getDiffDays(sDate: any, eDate : any) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);
    var Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);
  }

  onSubmit(){
    let leave = this.leaveForm.value;
    let noOfDays =  this.getDiffDays(leave.start, leave.end)
    let user = this.staff;
    let leaveObj = new Leave(user.id, user.department, leave.start, leave.end, noOfDays, leave.reason, 'Pending')
    this.httpServe.leaveApply(leaveObj).subscribe();
    this.leaveForm.reset();
    this.router.navigate(['staff']);
  }
}
