import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHandlerService } from '../shared/services/http-handler.service';
import { Leave } from '../shared/model/leave-model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit{
  currentStaff : any;
  staff : any;
  staffLeave : any;
  isLeave :boolean = false
  leaves  :Leave[] = [];
  constructor( private router: Router, private httpServe : HttpHandlerService){}

  ngOnInit(): void {
    if (localStorage.length === 0) {
      alert('Please enter your login Credentials');
        this.router.navigate(['/login']);
      }
    this.currentStaff = this.httpServe.getCurrentUser()
    this.staff = JSON.parse(this.currentStaff)
    this.httpServe.getLeaves().subscribe((res) => {
        this.staffLeave = res.filter((id) => id.staffId === this.staff.id);
        if(this.staffLeave.length){
          this.isLeave =true
        }
    });
  }


  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
