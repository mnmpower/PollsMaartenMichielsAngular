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
  isLoggedIn = false;

  constructor(private router: Router, private _authenticationService: AuthenticationService) {
    this._authenticationService.isLoggedin.subscribe(e => {
      if (this._authenticationService.isLoggedin.value == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit() {
  }

  logUit() {
    localStorage.removeItem('token');
    // this.isLoggedIn = false;
    this._authenticationService.isLoggedin.next(false);
    this.router.navigate([''], {replaceUrl: true});
  }


}
