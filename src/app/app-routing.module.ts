import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import {WelkomComponent} from './Authentication/welkom/welkom.component';
import {SignupComponent} from './Authentication/signup/signup.component';


const routes: Routes = [
  { path: 'welkom', component: WelkomComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'logIn', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
