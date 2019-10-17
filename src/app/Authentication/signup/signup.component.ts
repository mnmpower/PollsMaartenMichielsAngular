import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/Services/authentication.service';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MustMatch} from '../helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private _authenticationService: AuthenticationService) {
  }

  submitted = false;
  checkedValidUsername = false;
  inUse = false;
  SingUpForm: FormGroup;

  // convenience getter for easy access to form fields
  get f() {
    return this.SingUpForm.controls;
  }

  //
  // checkAllValidations(){
  //   MustMatch('inputPasswordSignUp', 'inputPasswordConfirm');
  //   MustMatch('inputEmailSignUp', 'inputEmailConfirm');
  // }

  ngOnInit() {
    this.SingUpForm = this.fb.group({
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
    this.SingUpForm.controls['inputGebruikersnaam'].setErrors({'inUse': true});
    this.SingUpForm.markAsDirty();
    this.inUse = true;
  }

  onSubmit() {
    this.submitted = true;

    if (this.SingUpForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.SingUpForm.value));
    //
    //
    // console.log(this.SingUpForm.getRawValue());
    // // Hier validation toevoegen in de opgenomen waardes
    // console.log(this.SingUpForm.get('inputPasswordSignUp').value);
    // console.log(this.SingUpForm.get('inputPasswordConfirm').value);

    this._authenticationService.authenticate(this.SingUpForm.value).subscribe(result => {
      localStorage.setItem('token', result.token);
      this._authenticationService.isLoggedin.next(result.token ? true : false);

      this.router.navigate([''], {replaceUrl: true});
    });
  }
}
