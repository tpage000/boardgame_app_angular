// https://angular.io/guide/form-validation
// https://material.angular.io/components/form-field/overview

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private router: Router) { }
  registrationForm: any;

  ngOnInit(): void { 
    this.registrationForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'username': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }
  get email() { return this.registrationForm.get('email'); }

  getError(prop) {
    if (this[prop].hasError('minlength')) return `${prop} must have at least ${this[prop].errors.minlength.requiredLength} characters`;
    if (this[prop].hasError('email')) return 'not a valid email address';
    if (this[prop].hasError('required')) return 'required';
  }

  submitRegistration() {
    console.log(this.registrationForm.status);
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value)
      .subscribe(data => {
        console.log('data from server: ', data)
        this.router.navigate(['/games']);
      })
  }
}
