import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { IJob } from 'src/app/interfaces/job.interface';
import { JobService } from '../job.service';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

    jobMG!: IJob;

    constructor(private jobService: JobService, public service: UserService, private route: ActivatedRoute, private router: Router) {
        this.service = service;
        this.jobMG = {
            name: "",
            description: "",
            salary: 0
        } 
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.jobService.getJob(id!).subscribe({
            next: (response) => {
                this.jobMG = response.result;
                //this.jobMG.description = this.jobMG.description.replace("\n", '<br>');
            },
            error: (error) => {

            }
        })
    }

    deleteJob(jobId?: string) {
        console.log("deleteJob", jobId);
        if (!confirm('Are you sure?')) {
            return;
        }
        this.jobService.deleteJob(jobId).subscribe(
            {
                next: (response) => {

                    console.log(response);
                    this.router.navigate(['/catalog'])
                },
                error: (error) => {

                }

            }
        );
    }





}
