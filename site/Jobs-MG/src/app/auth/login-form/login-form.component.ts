import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{

    @Output() newErrorEvent = new EventEmitter<string>();

    errorMessage!: string;

    constructor( private router: Router,private route: ActivatedRoute, private service:UserService){

    }
    form = new FormGroup({
        'userEmail': new FormControl('',[Validators.required, Validators.email]),
        'userPassword': new FormControl('',[Validators.required])
    });
    get userEmail(){
        return this.form.get('userEmail');
    }
    get userPassword(){
        return this.form.get('userPassword');
    }

    ngAfterContentInit(){   
        


        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        console.log(returnUrl);

        if(returnUrl) {

            setTimeout(() => { 
                this.emitError('You must login to access this page.')
            }, 0)
        } 
    }
    
    invalidLogin: boolean = false; 
    handleLogin(form:FormGroup){
        this.service.loginUser(form.value)
        .subscribe({
            next: (response:any)=>{
                if(!response.success){

                    this.invalidLogin = true;
                    this.errorMessage = response.error;
                    this.emitError(response.error);
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

    emitError(error: string){
        this.newErrorEvent.emit(error);
    }

}
