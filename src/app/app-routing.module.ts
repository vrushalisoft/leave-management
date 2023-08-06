import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HodComponent } from './hod/hod.component';
import { StaffComponent } from './staff/staff.component';
import { LeaveFormComponent } from './staff/leave-form/leave-form.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"staff", component:StaffComponent},
  {path:"hod", component:HodComponent},
  {path:"register", component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
