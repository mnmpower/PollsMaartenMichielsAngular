import { NgModule } from '@angular/core';
import { NavbarComponent } from 'src/app/Navbar/navbar.component';
import { WelkomComponent } from './welkom/welkom.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { GebruikerService} from '../Services/gebruiker.service';
import {VriendService} from '../Services/vriend.service';

import { SharedModule} from '../Shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    WelkomComponent,
    LoginComponent,
    SignupComponent],
  imports: [
    SharedModule,
  ],
  exports: [
    NavbarComponent,
    WelkomComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [
    GebruikerService,
    VriendService
  ]
})
export class AutenticationModule { }
