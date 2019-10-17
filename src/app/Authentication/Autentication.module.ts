import { NgModule } from '@angular/core';
import { NavbarComponent } from 'src/app/Authentication/navbar/navbar.component';
import { WelkomComponent } from './welkom/welkom.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { GebruikerService} from '../Services/gebruiker.service';

import { SharedModule} from '../Shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptor} from './helpers/security.intercerptor';


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
    GebruikerService
  ]
})
export class AutenticationModule { }
