import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AutenticationModule } from 'src/app/Authentication/Autentication.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './Shared/shared.module';
import { NgModule } from '@angular/core';


import {Gebruiker} from './Models/gebruiker.model';
import {GebruikerService} from './Services/gebruiker.service';
import {AuthenticationService} from './Services/authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {NeedAuthGuard} from './Authentication/helpers/need-auth-guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptor} from 'src/app/Authentication/helpers/security.intercerptor';
import {WelkomComponent} from './Authentication/welkom/welkom.component';
import {SignupComponent} from './Authentication/signup/signup.component';
import {LoginComponent} from './Authentication/login/login.component';

const appRoutes: Routes = [
  { path: '', component: WelkomComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'logIn', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatIconModule,
    AutenticationModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true,
  },
    NeedAuthGuard,
    Gebruiker,
    GebruikerService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
