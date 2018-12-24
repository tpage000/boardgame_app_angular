// https://angular.io/guide/form-validation
// https://material.angular.io/components/form-field/overview

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { AVATARS } from '../_constants/avatars';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  registrationForm: any;

  loginForm: any;

  register = false;

  user:any = {
    username: ''
  };

  avatars = AVATARS;

  error: string = '';

  regError: string = '';

  constructor(
    private registrationService: RegistrationService, 
    private router: Router,
    public authService: AuthenticationService,
    private userService: UserService
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
    // this.user = this.authService.currentUser;
    if (this.authService.isLoggedIn()) {
      this.userService.getSelf()
        .subscribe(res => {
          this.user = res;
        })
    }
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
    this.regError = '';
    if (this.registrationForm.valid) {
      this.registrationService.register(this.registrationForm.value)
        .subscribe(data => {
          this.registrationForm.reset();
          this.userService.getSelf()
            .subscribe(res => {
              this.user = res;
            })
        }, err => {
          this.regError = err;
        });
    } else {
      this.regError = 'Missing or invalid entries';
    }
  }
  
  submitLogin() {
    this.error = '';
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          this.loginForm.reset();
          this.userService.getSelf()
            .subscribe(res => {
              this.user = res;
            })
        }, err => {
          this.error = err;
        })
    } else {
      this.error = 'Missing or invalid entries';
    }
  }

  updateAvatar(avatar) {
    this.userService.updateUser(this.user._id, { avatar })
      .subscribe(res => {
        this.user = res;
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(res => {
        this.user = null;
      });
  }
}
