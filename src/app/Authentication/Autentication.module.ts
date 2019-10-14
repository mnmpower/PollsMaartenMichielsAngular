import { NgModule } from '@angular/core';
import { NavbarComponent } from 'src/app/Authentication/navbar/navbar.component';
import { WelkomComponent } from './welkom/welkom.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    WelkomComponent,
    LoginComponent,
    SignupComponent],
  imports: [
    SharedModule
  ],
  exports: [
    NavbarComponent,
    WelkomComponent,
    LoginComponent,
    SignupComponent
  ],
})
export class AutenticationModule { }
