import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  form = new FormGroup({
    'userEmail': new FormControl('',[Validators.required, Validators.email]),
    'userPassword': new FormControl('',[Validators.required])
  });
  get userEmail(){
    return this.form.get('userEmail');
  }
  get userPassword(){
    return this.form.get('userPassword');
  }
}
