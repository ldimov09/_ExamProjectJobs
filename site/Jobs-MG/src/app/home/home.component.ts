import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    service!:UserService;
    constructor(service: UserService) { 
        this.service = service;
    }

    ngOnInit(): void {
    }

}
