import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/Services/authentication.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'EZ-Poll';
  toonExtraNavOptions = false;

  constructor(private router: Router, private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  logUit() {
    localStorage.removeItem('token');
    this.router.navigate(['../security'], {replaceUrl: true});
    this._authenticationService.isLoggedin = new BehaviorSubject(false);
  }


}
