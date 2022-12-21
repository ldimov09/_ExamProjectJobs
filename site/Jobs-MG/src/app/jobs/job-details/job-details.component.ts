import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/animations/animation';
import { UserService } from 'src/app/auth/user.service';
import { IJob } from 'src/app/interfaces/job.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { JobService } from '../job.service';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss'],
    animations: [ fade ]
})
export class JobDetailsComponent implements OnInit {

    jobMG!: IJob;
    loggedUserId!: string;
    users!: IUser[];
    appliedUsers!: IUser[];

    @Output() newErrorEvent = new EventEmitter<string>();

    errorMessage!: string;


    constructor(
        private jobService: JobService, 
        public service: UserService, 
        private route: ActivatedRoute, 
        private router: Router
    ) {
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
                if(response.result){
                    this.jobMG = response.result;

                }else{
                    console.log('No job found with id: ' + id);
                    this.emitError('No job found with id: ' + id);
                    this.router.navigate(['/catalog']);
                }

                if(this.service.user) this.getAllUsers();

            },
            error: (error) => {

            }
        })
    }

    setAppliedUsers() {
        this.appliedUsers = this.users.filter(x => this.jobMG.applications?.includes(x._id!));
        console.log(this.appliedUsers);
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

    checkApplication(applyButton: boolean) {
        if(this.users){
            const filteredUsers = this.users.filter(el => el._id == this.loggedUserId);
            if (filteredUsers.length) {
                if (filteredUsers[0].applications?.indexOf(this.jobMG._id!) !== -1 && applyButton)
                    return true;
                if (filteredUsers[0].applications?.indexOf(this.jobMG._id!) === -1 && !applyButton)
                    return true;
            }
        }
        return false;
    }
    
    handleApplication(action: boolean) {
        const payload = {
            userId: this.loggedUserId,
            action: action,
            jobId: this.jobMG._id,
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

    hasApplicants() {
        if(this.appliedUsers){
            return this.appliedUsers.length > 0;
        }
        return false;
    }

    getAllUsers() {
        this.service.getUsers().subscribe({
            next: (response) => {                
                this.users = response.result;
                this.loggedUserId = this.service.user._id;      
                
                this.setAppliedUsers();
            },
            error: (error) => {
            }
        })
    }    

    emitError(error: string){
        this.newErrorEvent.emit(error);
    }

}
