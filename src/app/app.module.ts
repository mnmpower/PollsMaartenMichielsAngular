import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Authentication/navbar/navbar.component';
import { WelkomComponent } from './Authentication/welkom/welkom.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelkomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
