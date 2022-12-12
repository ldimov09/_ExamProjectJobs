import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJob } from 'src/app/interfaces/job.interface';
import { JobService } from '../job.service';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

    jobMG!: IJob;

    constructor(private jobService: JobService, private route: ActivatedRoute) {
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
            },
            error: (error) => {

            }
        })

    }

}
