import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @Output() newErrorEvent = new EventEmitter<string>();

    service!:UserService;
    constructor(service: UserService, private route: ActivatedRoute) { 
        this.service = service;
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(){   
    
        let showError = this.route.snapshot.queryParamMap.get('guard');
        if(showError) {

            setTimeout(() => { 
                this.emitError('You are already logged in.')
            }, 0)
        } 
    }

    emitError(error: string){
        this.newErrorEvent.emit(error);
    }

}
