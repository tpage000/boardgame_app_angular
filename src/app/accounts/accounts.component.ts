// https://angular.io/guide/form-validation
// https://material.angular.io/components/form-field/overview

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  registrationForm: any;

  loginForm: any;

  register = false;

  constructor(
    private registrationService: RegistrationService, 
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void { 
    this.registrationForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'username': new FormControl('', [Validators.required, Validators.maxLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(2)])
    })
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  get registerUsername() { return this.registrationForm.get('username'); }
  get registerPassword() { return this.registrationForm.get('password'); }
  get registerEmail() { return this.registrationForm.get('email'); }
  get loginUsername() { return this.loginForm.get('username'); }
  get loginPassword() { return this.loginForm.get('password'); }

  getError(prop) {
    if (this[prop].hasError('minlength')) return `${prop} must have at least ${this[prop].errors.minlength.requiredLength} characters`;
    if (this[prop].hasError('maxlength')) return `${prop} cannot exceed ${this[prop].errors.maxlength.requiredLength} characters`;
    if (this[prop].hasError('email')) return 'not a valid email address';
    if (this[prop].hasError('required')) return 'required';
  }

  submitRegistration() {
    console.log(this.registrationForm.status);
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/sessions']);
      })
  }
  
  submitLogin() {
    console.log(this.loginForm.status);
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value)
      .subscribe(data => {
        this.router.navigate(['/sessions']);
      })
  }
}
