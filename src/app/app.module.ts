import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HodComponent } from './hod/hod.component';
import { StaffComponent } from './staff/staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHandlerService } from './shared/services/http-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { LeaveFormComponent } from './staff/leave-form/leave-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HodComponent,
    StaffComponent,
    LeaveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    ],
  providers: [
    HttpHandlerService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
