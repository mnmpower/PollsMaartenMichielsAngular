import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../Services/authentication.service';

@Component({
  selector: 'app-welkom',
  templateUrl: './welkom.component.html',
  styleUrls: ['./welkom.component.scss']
})
export class WelkomComponent implements OnInit {
  title = 'EZ-Poll';
  auteur = 'Maarten Michiels';
  show: boolean = false;

  constructor(private _authenticationService: AuthenticationService) {


    this._authenticationService.isLoggedin.subscribe(e => {
      //  Do something with the value of this BehaviorSubject
      //  Every time the value changes this code will be triggered
      console.log(this._authenticationService.isLoggedin.value);
      console.log(this._authenticationService.isLoggedin.value);
      console.log(this._authenticationService.isLoggedin.value);
      console.log(this._authenticationService.isLoggedin.value);
      console.log(this._authenticationService.isLoggedin.value);
      if (this._authenticationService.isLoggedin.value == true) {
        this.show = true;
      }


    });
  }

  ngOnInit() {
  }

}
