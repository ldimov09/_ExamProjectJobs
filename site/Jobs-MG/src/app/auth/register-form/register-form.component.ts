import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from '../user.service';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  users!: IUser[];

  @Output() newErrorEvent = new EventEmitter<string>();


  constructor(private service: UserService, private router: Router) {

  }

  getAllUsers() {
    console.log("tuk");
    this.service.getUsers()
      .subscribe({
        next: (response) => {
          this.users = response.result;
          console.log(this.users);
        },
        error: (error) => {

        }
      })
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

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

  get userRepass() {
    return this.form.get('userRepass')
  }

  handleSubmit() {
    let formValue: IUser = {
      displayName: this.form.value.name!,
      password: this.form.value.password!,
      email: this.form.value.email!,
      gender: 'male',
      imageIndex: "3"
    };
    console.log(formValue);
    this.service.createUser(formValue)
      .subscribe({
        next: (response) => {
          if (!response.success) {
            console.log(response);
            this.emitError(response.error);
          }else{
            const token = response.result;
            this.getAllUsers();
            this.router.navigate(['/']);
            localStorage.setItem('token', token);
          }
        },
        error: () => {

        }
      })

  }

  handleDeleteUser(user: IUser) {

  }

  emitError(error: string) {
    this.newErrorEvent.emit(error);
  }
}
