import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private router: Router, 
        private service: UserService) { }

    canActivate(route: any, state: RouterStateSnapshot){
        if(this.service.isLoggedIn()) return true;
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}