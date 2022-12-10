import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/user.service';
import { IJob } from 'src/app/interfaces/job.interface';
//import { IUser } from 'src/app/interfaces/user.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-edit-job-form',
  templateUrl: './edit-job-form.component.html',
  styleUrls: ['./edit-job-form.component.scss']
})
export class EditJobFormComponent implements OnInit {

  jobs!: IJob[];
  //users!: IUser[];


  constructor(private service : UserService, private jobService : JobService) { }

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'salary': new FormControl(0, [Validators.required]),
  })

  get name() {
    return this.form.get('name')
  }

  get description() {
    return this.form.get('description')
  }

  get salary() {
    return this.form.get('salary');
  }

  updateJob(form: FormGroup) {
    const job: IJob = {
      name: this.form.value.name!,
      description: this.form.value.description!,
      salary: this.form.value.salary!,
    }

    console.log(job);

    this.jobService.updateJob(job, '6393762f045fca10ea31bc7c')
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: () => {

        }
      })
    
  }

   
  loadJob() {
    this.jobService.getJob('6393762f045fca10ea31bc7c')
    .subscribe({
      next: (response) => {
        const job = response.result;
        this.form.patchValue({ 
          name: job.name,
          description: job.description,
          salary: job.salary,
        })
      }
    })
  }

  ngOnInit(): void {
    this.loadJob();
  }

}
