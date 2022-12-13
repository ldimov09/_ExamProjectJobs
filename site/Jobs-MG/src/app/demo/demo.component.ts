import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { IJob } from '../interfaces/job.interface';
import { IUser } from '../interfaces/user.interface';
import { JobService } from '../jobs/job.service';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

    users!: IUser[];
    jobs!: IJob[];
    ownerId: string = "";
    service!: UserService;
    constructor(service: UserService, private jobService: JobService) {
        this.service = service;
    }


    ngOnInit(): void {
        if(this.service.user){
            this.ownerId = this.service.user._id;
            this.service.getUsers().subscribe({
                next: (response) => {
                    this.users = response.result;
                    this.getAllJobs();
                },
                error: (error) => {

                }
            })
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


    deleteJob(jobId?: string) {
        console.log("deleteJob", jobId);
        if (!confirm('Are you sure?')) {
            return;
        }
        this.jobService.deleteJob(jobId).subscribe(
            {
                next: (response) => {
                    this.getAllJobs();
                },
                error: (error) => {

                }

            }
        );
    }

    handleReaction(job: IJob, ownerId: string, reaction: string) {
        const payload = {
            userId: ownerId,
            reaction: reaction,
            jobId: job._id,
        }

        this.jobService.updateJobReactions(payload)
            .subscribe({
                next: (response) => {
                    this.getAllJobs();
                },
                error: (error) => {

                }
            });
    }

    handleApplication(job: IJob, ownerId: string, action: boolean) {
        const payload = {
            userId: ownerId,
            action: action,
            jobId: job._id,
        }

        this.jobService.updateUserApplications(payload).subscribe(
            {
                next: (response) => {
                    this.getAllUsers();
                },
                error: (error) => {

                }
            }
        );

    }

    checkReaction(job: IJob, reaction: string) {
        if (reaction === 'like' && job.likes?.indexOf(this.ownerId) !== -1) {
            return true;
        } else if (reaction === 'dislike' && job.dislikes?.indexOf(this.ownerId) !== -1) {
            return true;
        } else if (reaction === 'neutral' && job.likes?.indexOf(this.ownerId) === -1 && job.dislikes?.indexOf(this.ownerId) === -1) {
            return true;
        }
        return false;
    }

    checkApplication(job: IJob, applyButton: boolean) {
        const filteredUsers = this.users.filter(el => el._id == this.ownerId);
        if (filteredUsers.length) {
            if (filteredUsers[0].applications?.indexOf(job._id!) !== -1 && applyButton)
                return true;
            if (filteredUsers[0].applications?.indexOf(job._id!) === -1 && !applyButton)
                return true;
        }
        return false;
    }

    checkFavorite(job: IJob, favoriteButton: boolean) {
        const filteredUser = this.users.filter(el => el._id === this.ownerId);;
        if (filteredUser.length) {
            if (filteredUser[0].favorites?.indexOf(job._id!) !== -1 && favoriteButton)
                return true;
            if (filteredUser[0].favorites?.indexOf(job._id!) === -1 && !favoriteButton)
                return true;
        }
        return false;
    }

    handleFavorite(job: IJob, ownerId: string, action: boolean) {
        const payload = {
            userId: ownerId,
            action: action,
            jobId: job._id,
        }
        this.jobService.updateUserFavorites(payload).subscribe(
            {
                next: (response) => {
                    this.getAllUsers();
                },
                error: (error) => {

                }
            }
        )
    }    

    getAllUsers() {
        this.service.getUsers().subscribe({
            next: (response) => {
                this.users = response.result;
            },
            error: (error) => {
            }
        })
    }    

}
