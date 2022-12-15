import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fade, slide } from './animations/animation';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade, slide]
})
export class AppComponent {

  constructor(private router: Router){
    this.router.events.subscribe({
      next: (event: any) => {
          this.showWarning = false;
      }
    })
  }

  title = 'Jobs-MG';

  error!: string;
  subscription!: Subscription;
  showWarning: boolean = false;

  subscribeToEventEmitter(elementRef: any) {
    if(elementRef instanceof RegisterFormComponent || elementRef instanceof LoginFormComponent || elementRef instanceof HomeComponent){
      const child: LoginFormComponent | RegisterFormComponent | HomeComponent  = elementRef;
      
      child.newErrorEvent.subscribe((response) => {
        console.log(response);
        this.error = response;
        this.showWarning = true;
      })
    }
  }

  unsubscribeFromEventEmitter() {
    if(this.subscription) {
      console.log('unsubscribed from event');
      this.subscription.unsubscribe();
    }
  }

  closeAlert() {
    this.showWarning = false;
  }
}
