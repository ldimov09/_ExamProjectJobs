import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { JwtHelperService } from "@auth0/angular-jwt";

interface IGetUsersResponse {
    success: boolean;
    result: IUser[];
}
interface ICreateUsersResponse {
    success: boolean;
    result: string;
    error: string;
}

interface IGetUserResponse {
  success: boolean;
  result: IUser;
  error: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string = 'http://localhost:3000/api/auth/';
    //users!:IUser[];
    constructor(private http: HttpClient) { 
        //this.serviceGetUsers();
        //console.log("omg");
    }

    /*
    serviceGetUsers(){
        this.getUsers().subscribe({
            next: (response) => {
                this.users = response.result;
            },
            error: (error) => {
            }
        })
    }
    */

    getUsers() {
        return this.http.get<IGetUsersResponse>(this.url + 'users');
    }

    getUserById(id: string){
      return this.http.get<IGetUserResponse>(this.url + 'users/' + id)
    }

    createUser(user: IUser) {
        return this.http.post<ICreateUsersResponse>(this.url + 'register', user);
    }

    deleteUser(userId: string) {
        //return this.http.delete
    }

    loginUser(credentials: { userEmail: string, userPassword: string }) {
        return this.http.post(this.url + 'login', credentials);
    }

    isLoggedIn():boolean {
        const helper = new JwtHelperService();
        let token = localStorage.getItem('token');
        if (!token) return false;
        return !helper.isTokenExpired(token);
    }

    get user() {
        let token = localStorage.getItem('token');
        if (!token) return null;

        const helper = new JwtHelperService();
        return helper.decodeToken(token);
    }

    getFavorites(){

    }

}
