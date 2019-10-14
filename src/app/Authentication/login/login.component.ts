import {Component, OnInit} from '@angular/core';
// import { AuthenticateService } from 'src/app/Services/authenticate.service';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(2)]]
  });


  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted);
    // console.log(this.loginForm.value);
    // this._authenticateService.authenticate(this.loginForm.value).subscribe(result => {
    //   localStorage.setItem("token", result.token);
    //   this._authenticateService.isLoggedin.next(result.token ? true : false);
    //
    //   this.router.navigate(['../home'], { replaceUrl: true });
    // });
  }
}
