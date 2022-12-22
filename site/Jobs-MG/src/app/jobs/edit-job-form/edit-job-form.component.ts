import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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


    jobId!: string;
    jobs!: IJob[];
    //users!: IUser[];


    constructor(private service: UserService, private jobService: JobService, private route: ActivatedRoute, private router: Router) { }
    
    form = new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'salary': new FormControl(0, [Validators.required]),
    })

    ngOnInit(): void {
        this.jobId = this.route.snapshot.paramMap.get('id')!;
    
        this.loadJob();
    }

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

        this.jobService.updateJob(job, this.jobId)
            .subscribe({
                next: (response) => {
                    this.router.navigate(['/catalog/' + this.jobId]);
                },
                error: () => {

                }
            })

    }


    loadJob() {
        this.jobService.getJob(this.jobId)
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


}
