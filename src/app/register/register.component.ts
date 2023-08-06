import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../shared/services/http-handler.service';
import { Status, User } from '../shared/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : any | FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb : FormBuilder, private httpServe : HttpHandlerService, private router: Router){}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        role : this.fb.control('', Validators.required),
        firstName : this.fb.control('', Validators.required),
        lastName : this.fb.control('', Validators.required),
        email : this.fb.control('', Validators.required),
        contactNo : this.fb.control('', Validators.required),
        department: this.fb.control('', Validators.required),
        username : this.fb.control('', Validators.required),
        password : this.fb.control('', Validators.required),
      })
  }


  onRegister(): void {
    let user = this.registerForm.value
    let userObj = new User(user.firstName, user.lastName, user.email, user.contactNo, user.department, user.username, user.password, user.role)
    this.httpServe.register(userObj).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.registerForm.reset();

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}

