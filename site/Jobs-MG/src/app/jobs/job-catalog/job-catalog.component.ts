import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { JobService } from '../job.service';

import { IJob } from 'src/app/interfaces/job.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { fade, slide } from 'src/app/animations/animation';

@Component({
    selector: 'app-job-catalog',
    templateUrl: './job-catalog.component.html',
    styleUrls: ['./job-catalog.component.scss'],
    animations: [ fade, slide]
})
export class JobCatalogComponent implements OnInit {

    user!: IUser;
    jobs!: IJob[];
    ownerId: string  = "";
    service!: UserService;
    constructor(service: UserService, private jobService: JobService) { 
        this.service = service;
    }

    ngOnInit(): void {
        if(this.service.user){
            this.getUserById(this.service.user._id);
            this.ownerId = this.service.user._id;
        }
        else{
            this.getAllJobs();
        }
    }

    getAllJobs() {
        this.jobService.getAllJobs().subscribe({
            next: (response) => {
                this.jobs = response.result;
                console.log(this.jobs);
            },
            error: (error) => {

            }
        });
    }

    getUserById(id:string){
        this.service.getUserById(id).subscribe({
            next: (response) => {
                this.user = response.result;
                this.getAllJobs();
            },
            error: (error) => {

            }
        })
    }

    isOwner(job:IJob){
        if(this.service.user)
            return  job.owner == this.service.user._id;
        return false;
    }

    checkApplication(job: IJob, applyButton: boolean) {
        const filteredUsers = this.user;
        if (filteredUsers) {
            if (filteredUsers.applications?.indexOf(job._id!) !== -1 && applyButton)
                return true;
            if (filteredUsers.applications?.indexOf(job._id!) === -1 && !applyButton)
                return true;
        }
        return false;
    }


}
