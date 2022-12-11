import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../auth/user.service';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    service!: UserService;
    isShowDivIf = true;

    constructor(private router: Router, service: UserService) {
        this.service = service;
    }

    ngOnInit(): void {
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }    
  
}
//https://monitive.com/blog/2021-03-04-css-only-responsive-navigation/