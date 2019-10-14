import {Component, OnInit} from '@angular/core';
// import { AuthenticateService } from 'src/app/Services/authenticate.service';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) {
  }

  SingUpForm = this.fb.group({
    inputNaam: ['', Validators.required],
    inputVoornaam: ['', Validators.required],
    inputGebruikersnaam: ['', Validators.required],
    inputEmailSignUp: ['', Validators.required],
    inputEmailConfirm: ['', Validators.required],
    inputPasswordSignUp: ['', Validators.required],
    inputPasswordConfirmation: ['', [Validators.required, Validators.minLength(2)]]
  });

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.SingUpForm.getRawValue());
    // console.log(this.loginForm.value);
    // this._authenticateService.authenticate(this.loginForm.value).subscribe(result => {
    //   localStorage.setItem("token", result.token);
    //   this._authenticateService.isLoggedin.next(result.token ? true : false);
    //
    //   this.router.navigate(['../home'], { replaceUrl: true });
    // });
  }
}
