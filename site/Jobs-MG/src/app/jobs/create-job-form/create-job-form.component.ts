import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from 'src/app/auth/register-form/password.validators';
import { UserService } from 'src/app/auth/user.service';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss']
})
export class CreateJobFormComponent implements OnInit {

  users! : IUser[]

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe({
      next: (response) => {
        this.users = response.result;
      },
      error: (error) => {

      }
    })
  }

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'salary': new FormControl('', [Validators.required]),
    'owner': new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }
  get salary() {
    return this.form.get('salary');
  }

  createJob(form: FormGroup){
    console.log(form.value);
  }

}
