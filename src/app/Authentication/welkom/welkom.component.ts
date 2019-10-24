import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../Services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-welkom',
  templateUrl: './welkom.component.html',
  styleUrls: ['./welkom.component.scss']
})
export class WelkomComponent implements OnInit {
  title = 'EZ-Poll';
  auteur = 'Maarten Michiels';
  isLoggedIn: boolean = false;

  constructor(private _authenticationService: AuthenticationService, private router: Router) {

    this._authenticationService.isLoggedin.subscribe(e => {
      if (this._authenticationService.isLoggedin.value == true) {
        this.isLoggedIn = true;
      }
    });
  }

  ngOnInit() {
  }

  naarDashboard() {
    this.router.navigate(['poll'], {replaceUrl: true});
  }
}
