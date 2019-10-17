import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../Services/authentication.service';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private _authenticationService: AuthenticationService) {
  }

  loginForm = this.fb.group({
    Email: ['', Validators.required],
    Wachtwoord: ['', Validators.required]
  });


  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted);
    console.log(this.loginForm.getRawValue());

    this._authenticationService.authenticate(this.loginForm.value).subscribe(result => {
      localStorage.setItem('token', result.token);

      this._authenticationService.isLoggedin.next(result.token ? true : false);
      this.router.navigate(['../signUp'], {replaceUrl: true});
    });

    console.log('INLOGGEN MISLUKT');
  }
}
