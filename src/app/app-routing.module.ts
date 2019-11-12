import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import {WelkomComponent} from './Authentication/welkom/welkom.component';
import {SignupComponent} from './Authentication/signup/signup.component';
import {DashboardComponent} from './User/dashboard/dashboard.component';
import {PollComponent} from './User/poll/poll.component';
import {FriendComponent} from './User/friend/friend.component';
import {SettingsComponent} from './User/settings/settings.component';
import {PollresultComponent} from './User/poll/pollresult/pollresult.component';
import {EditpollComponent} from './User/poll/editpoll/editpoll.component';
import {NeedAuthGuard} from './Authentication/helpers/need-auth-guard';


const routes: Routes = [
  { path: '', component: WelkomComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'logIn', component: LoginComponent },
  // authenticatien toevoegen bij alle onderstaande!!!
  { path: 'dashboard', component: DashboardComponent, canActivate: [NeedAuthGuard] },
  { path: 'polls', component: PollComponent, canActivate: [NeedAuthGuard] },
  { path: 'friends', component: FriendComponent, canActivate: [NeedAuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [NeedAuthGuard] },
  { path: 'pollResult', component: PollresultComponent, canActivate: [NeedAuthGuard] },
  { path: 'editPoll', component: EditpollComponent, canActivate: [NeedAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
