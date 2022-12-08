import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
    'name': new FormControl('', [Validators.required]),
    'userRepass': new FormControl('', [Validators.required]),
  }, PasswordValidators.passwordShouldMatch);

  get userEmail() {
    return this.form.get('email')
  }

  get userPassword() {
    return this.form.get('password')
  }

  get userDisplayName() {
    return this.form.get('name')
  }

  get userRepass () {
    return this.form.get('userRepass')
  }

  handleSubmit(){
    console.log(this.form.value);
  }
}
