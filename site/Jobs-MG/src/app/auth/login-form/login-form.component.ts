import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    constructor( private router: Router,private route: ActivatedRoute, private service:UserService){

    }
    form = new FormGroup({
        'userEmail': new FormControl('some@email.com',[Validators.required, Validators.email]),
        'userPassword': new FormControl('12345678',[Validators.required])
    });
    get userEmail(){
        return this.form.get('userEmail');
    }
    get userPassword(){
        return this.form.get('userPassword');
    }
    
    invalidLogin: boolean = false; 
    handleLogin(form:FormGroup){
        this.service.loginUser(form.value)
        .subscribe({
            next: (response:any)=>{
                if(!response.success){
                    console.log(response.error);
                    this.invalidLogin = true;
                }
                else{
                    console.log(response.result);
                    let token = response.result;
                    localStorage.setItem('token', token);
                    
                    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                    this.router.navigate([returnUrl || '/']);

                }
            },
            error: (error)=>{
                console.error(error);
            }
        })
    }

}
