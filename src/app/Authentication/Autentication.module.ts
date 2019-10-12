import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/Authentication/navbar/navbar.component';
import { WelkomComponent } from './welkom/welkom.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    NavbarComponent,
    WelkomComponent,
    LoginComponent,
    SignupComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    WelkomComponent,
    LoginComponent,
    SignupComponent
  ],
})
export class AutenticationModule { }
