import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../Shared/shared.module';
import {GebruikerService} from '../Services/gebruiker.service';
import {VriendService} from '../Services/vriend.service';
import { AddFriendComponent } from './friend/add-friend/add-friend.component';

@NgModule({
  declarations: [AddFriendComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    GebruikerService,
    VriendService
  ]
})
export class UserModule { }
