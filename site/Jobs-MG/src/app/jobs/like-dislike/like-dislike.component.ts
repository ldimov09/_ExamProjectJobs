import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { IJob } from 'src/app/interfaces/job.interface';
import { JobService } from '../job.service';

@Component({
    selector: 'like-dislike',
    templateUrl: './like-dislike.component.html',
    styleUrls: ['./like-dislike.component.scss']
})
export class LikeDislikeComponent implements OnInit {
    @Input() job: IJob;
    @Input() iconSize: number = 24;
    isLoggedIn: boolean = false;

    loggedUserId: string = "";
    constructor(private service: UserService, private jobService: JobService) {
        this.job = {
            name: "",
            description: "",
            salary: 0
        }
    }

    ngOnInit(): void {
        if (this.service.user) {
            this.loggedUserId = this.service.user._id;
            this.isLoggedIn = this.service.isLoggedIn();
        }
    }

    checkReaction(job: IJob, reaction: string) {
        if (reaction === 'like' && job.likes?.indexOf(this.loggedUserId) !== -1) {
            return true;
        } else if (reaction === 'dislike' && job.dislikes?.indexOf(this.loggedUserId) !== -1) {
            return true;
        } else if (reaction === 'neutral' && job.likes?.indexOf(this.loggedUserId) === -1 && job.dislikes?.indexOf(this.loggedUserId) === -1) {
            return true;
        }
        return false;
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
                    this.getJobById(job._id);
                },
                error: (error) => {

                }
            });
    }

    getJobById(id: string | undefined) {
        this.jobService.getJob(id!).subscribe({
            next: (response) => {
                this.job = response.result;
            },
            error: (error) => {

            }
        })
    }


}
