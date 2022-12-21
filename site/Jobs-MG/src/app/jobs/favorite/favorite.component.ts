import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { IJob } from 'src/app/interfaces/job.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { JobService } from '../job.service';

@Component({
    selector: 'favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

    @Input() job!: IJob;
    @Input() iconSize:number = 24;
    @Output() changeEvent = new EventEmitter<IUser>();


    user!: IUser;
    loggedUserId: string = "";
    isLoggedIn: boolean = false;

    constructor(private service: UserService, private jobService: JobService) {
        this.isLoggedIn = this.service.user;
    }

    ngOnInit(): void {
        if (this.service.user) {
            this.loggedUserId = this.service.user._id;
            this.isLoggedIn = this.service.isLoggedIn();
            this.getUserById(this.service.user._id)
        }
    }

    checkFavorite(favoriteButton: boolean) {
        const filteredUser = this.user;
        if (filteredUser) {
            if (filteredUser.favorites?.indexOf(this.job._id!) !== -1 && favoriteButton)
                return true;
            if (filteredUser.favorites?.indexOf(this.job._id!) === -1 && !favoriteButton)
                return true;
        }
        return false;
    }

    handleFavorite(action: boolean) {
        const payload = {
            userId: this.loggedUserId,
            action: action,
            jobId: this.job._id,
        }
        this.jobService.updateUserFavorites(payload).subscribe(
            {
                next: (response) => {
                    this.getUserById(this.service.user._id);
                    
                    console.log('fine')
                },
                error: (error) => {

                }
            }
        )
    }
    
    getUserById(id:string){
        this.service.getUserById(id).subscribe({
            next: (response) => {
                this.user = response.result;
                this.loggedUserId = this.user._id!;
                this.changeEvent.emit(this.user);
            },
            error: (error) => {

            }
        })
    }

}
