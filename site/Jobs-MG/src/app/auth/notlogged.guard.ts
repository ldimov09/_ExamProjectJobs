import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotloggedGuard implements CanActivate {
  constructor(
    private router: Router, 
    private service: UserService) { }

canActivate(route: any, state: RouterStateSnapshot){
    if(!this.service.isLoggedIn()) return true;
    this.router.navigate(['/'], { queryParams: { guard: true }});
    return false;
}
  
}
