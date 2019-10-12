import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { WelkomComponent } from './welkom/welkom.component';



@NgModule({
  declarations: [NavbarComponent, WelkomComponent],
  imports: [
    CommonModule
  ]
})
export class AutenticationModule { }
