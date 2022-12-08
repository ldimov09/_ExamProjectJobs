import { AbstractControl } from "@angular/forms";

export class PasswordValidators{
    static passwordShouldMatch(control:AbstractControl){
        let userPassword = control.get('password');
        let userRepass = control.get('userRepass');
        if(userPassword?.value !== userRepass?.value){
            return {passwordShouldMatch:true}
        }
        return null;
    }
}