import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../Services/authentication.service';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Gebruiker} from '../../Models/gebruiker.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  gebruiker: Observable<Gebruiker> = null;

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

      // HIER NOG DE INGELOGDE ID OPVRAGEN EN DAN SETTEN
      sessionStorage.setItem('GebruikerID', String(result.gebruikerID));
      this._authenticationService.isLoggedin.next(result.token ? true : false);
      this.router.navigate(['dashboard'], {replaceUrl: true});
    });

    console.log('INLOGGEN MISLUKT');
  }
}
