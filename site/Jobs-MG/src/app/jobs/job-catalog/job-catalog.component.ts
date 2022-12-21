import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { JobService } from '../job.service';

import { IJob } from 'src/app/interfaces/job.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { fade, slide } from 'src/app/animations/animation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FavoriteComponent } from '../favorite/favorite.component';
import { LikeDislikeComponent } from '../like-dislike/like-dislike.component';

@Component({
    selector: 'app-job-catalog',
    templateUrl: './job-catalog.component.html',
    styleUrls: ['./job-catalog.component.scss'],
    animations: [fade, slide]
})
export class JobCatalogComponent implements OnInit {

    user!: IUser;
    jobsStatic!: IJob[];
    jobs!: IJob[];
    ownerId: string = "";
    service!: UserService;
    subscription!: Subscription;
    constructor(service: UserService, private jobService: JobService) {
        this.service = service;
    }

    form = new FormGroup({
        'favoriteFilter': new FormControl(),
        'appliedFilter': new FormControl(),
        'likedFilter': new FormControl(),
        'yourJobs': new FormControl(),
    });

    ngOnInit(): void {
        if (this.service.user) {
            this.getUserById(this.service.user._id);
            this.getAllJobs();
            this.ownerId = this.service.user._id;
        }
        else {
            this.getAllJobs();
        }
    }

    handleFilters(form: FormGroup) {
        let filterdJobs = this.jobsStatic;
        if (form.value.favoriteFilter) {
            filterdJobs = filterdJobs.filter(e => this.user.favorites?.includes(e._id!));
        }
        if (form.value.appliedFilter) {
            filterdJobs = filterdJobs.filter(e => this.user.applications?.includes(e._id!));
        }
        if (form.value.likedFilter) {
            filterdJobs = filterdJobs.filter(e => e.likes?.includes(this.user._id!))
        }
        if (form.value.yourJobs) {
            filterdJobs = filterdJobs.filter(e => e.owner === this.user._id);
        }
        this.jobs = filterdJobs;

    }

    getAllJobs() {
        this.jobService.getAllJobs().subscribe({
            next: (response) => {
                this.jobs = response.result;
                this.jobsStatic = response.result;
                console.log(this.jobs);
            },
            error: (error) => {

            }
        });
    }

    getUserById(id: string) {
        this.service.getUserById(id).subscribe({
            next: (response) => {
                this.user = response.result;

            },
            error: (error) => {

            }
        })
    }

    isOwner(job: IJob) {
        if (this.service.user)
            return job.owner == this.service.user._id;
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

    subscribeToEventEmitter(payload: any) {
        if (payload.favorites) {
            this.user = payload;
        }
        if(payload.likes) {
            let jobToChange = this.jobs.filter(job => job._id == payload._id)[0];
            let index = this.jobs.indexOf(jobToChange);
            this.jobs[index].likes = payload.likes;
            this.jobs[index].dislikes = payload.dislikes;
        }
    }

}
