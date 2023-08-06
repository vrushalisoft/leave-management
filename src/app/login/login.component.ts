import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHandlerService } from '../shared/services/http-handler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : any | FormGroup;
  user : any;
  isLoggedIn: boolean = false;
  errorMessage = '';

  constructor(private fb : FormBuilder, private httpServe : HttpHandlerService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    localStorage.removeItem('user');
    localStorage.clear();
    this.loginForm = this.fb.group({
      userName: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }

  onSubmit(){
    this.httpServe.getUser().subscribe({
      next: data => {
          for(let user of data){
            if(user.username === this.loginForm.value.userName && user.password === this.loginForm.value.password){
              localStorage.setItem('user',JSON.stringify(user));
              if(user.role === 'HOD'){
                this.router.navigate(['hod']);
              } else if(user.role === 'Staff'){
                this.router.navigate(['staff']);
              }
            }
          }
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
      }
    })
  }
}
