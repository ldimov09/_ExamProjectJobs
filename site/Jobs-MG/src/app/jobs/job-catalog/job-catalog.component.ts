import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { JobService } from '../job.service';

import { IJob } from 'src/app/interfaces/job.interface';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-job-catalog',
  templateUrl: './job-catalog.component.html',
  styleUrls: ['./job-catalog.component.scss']
})
export class JobCatalogComponent implements OnInit {


  users! :IUser[];
  jobs! :IJob[];
  ownerId!: string;

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

  setLoggedUser(ownerId: string) {
    this.ownerId = ownerId;
  }

  checkReaction(job: IJob, reaction: string) {
    if (reaction === 'like' && job.likes?.indexOf(this.ownerId) !== -1) {
      return true;
    }else if (reaction === 'dislike' && job.dislikes?.indexOf(this.ownerId) !== -1){
      return true;
    }else if (reaction === 'neutral' && job.likes?.indexOf(this.ownerId) === -1 && job.dislikes?.indexOf(this.ownerId) === -1) {
      return true;
    }
    return false;
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

  handleReaction(job: IJob, ownerId: string, reaction: string) {
    const payload = {
      ownerId: ownerId,
      reaction: reaction,
      jobId: job._id,
    }

    this.jobService.updateJobReactions(payload)
      .subscribe({
        next: (response) => {
          console.log(this.getAllJobs());
        },
        error: (error) => {

        }
      });
  }

}
