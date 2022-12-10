import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from 'src/app/auth/register-form/password.validators';
import { UserService } from 'src/app/auth/user.service';
import { IJob } from 'src/app/interfaces/job.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss']
})
export class CreateJobFormComponent implements OnInit {

  users! : IUser[];
  jobs! : IJob[];

  constructor(private service: UserService, private jobService: JobService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe({
      next: (response) => {
        this.users = response.result;
        this.getAllJobs();
      },
      error: (error) => {

      }
    })
  }

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'salary': new FormControl(0, [Validators.required]),
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
    let formValue:IJob = {
      name: this.form.value.name!,
      description: this.form.value.description!,
      salary: form.value.salary!,
      owner: form.value.owner,
    };
    console.log(formValue);
    this.jobService.createJob(formValue)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: () => {

        }
      })

  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe({
      next: (response) => {
        this.jobs = response.result;
        console.log(this.jobs);
        this.form.patchValue({
          name: this.jobs[0].name,
          description: this.jobs[0].description,
          salary: this.jobs[0].salary,
          owner: this.jobs[0].owner,
        });        
      },
      error: (error) => {

      }
    });
  }

}
