import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/Services/authentication.service';
import {GebruikerService} from '../../Services/gebruiker.service';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MustMatch} from '../helpers/must-match.validator';
import {Gebruiker} from '../../Models/gebruiker.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  constructor(private fb: FormBuilder, private router: Router, private _authenticationService: AuthenticationService,
              private _gebruikerService: GebruikerService) {
  }

  submitted = false;
  checkedValidUsername = false;
  inUse = false;
  SignUpForm: FormGroup;
  gebruiker: Gebruiker = new Gebruiker(0, '', '', '', '', '', '', null, null, null);

  // convenience getter for easy access to form fields
  get f() {
    return this.SignUpForm.controls;
  }

  ngOnInit() {
    this.SignUpForm = this.fb.group({
      inputNaam: ['', Validators.required],
      inputVoornaam: ['', Validators.required],
      inputGebruikersnaam: ['', [Validators.required, Validators.minLength(5)]],
      inputEmailSignUp: ['', [Validators.required, Validators.email]],
      inputEmailConfirm: ['', Validators.required],
      inputPasswordSignUp: ['', [Validators.required, Validators.minLength(8)]],
      inputPasswordConfirm: ['', Validators.required]
    }, {
      validator: [MustMatch('inputPasswordSignUp', 'inputPasswordConfirm'),
        MustMatch('inputEmailSignUp', 'inputEmailConfirm')]
    });
  }

  checkUsername() {
    // AANPASSEN DAT HIJ VIA API KIJKE OF USERNAME VRIJ IS
    // if (false) {
    //   this.SingUpForm.controls.inputGebruikersnaam.setErrors({inUse: true});
    //   this.checkedValidUsername = false;
    // } else {
    //   this.SingUpForm.controls.inputGebruikersnaam.setErrors(null);
    this.checkedValidUsername = true;
    // }
    // return true;
    this.inUse = !this.inUse;
  }

  onSubmit() {
    this.submitted = true;

    if (this.SignUpForm.invalid) {
      return;
    }

    this.gebruiker.Naam = this.SignUpForm.get(['inputNaam']).value;
    this.gebruiker.Voornaam = this.SignUpForm.get(['inputVoornaam']).value;
    this.gebruiker.Gebruikersnaam = this.SignUpForm.get(['inputGebruikersnaam']).value;
    this.gebruiker.Email = this.SignUpForm.get(['inputEmailSignUp']).value;
    this.gebruiker.Wachtwoord = this.SignUpForm.get(['inputPasswordSignUp']).value;

    console.log(this.gebruiker);


    this._gebruikerService.registreer(this.gebruiker).subscribe(result => {
      console.log(result);
    });


    // this._authenticationService.authenticate(this.SingUpForm.value).subscribe(result => {
    //   localStorage.setItem('token', result.token);
    //   this._authenticationService.isLoggedin.next(result.token ? true : false);

    this.router.navigate(['logIn'], {replaceUrl: true});
    // });
  }
}
