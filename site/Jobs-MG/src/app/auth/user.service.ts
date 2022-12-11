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

/*interface IGetUserResponse {
  success: boolean;
  result: IUser;
  error: string;
}*/

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string = 'http://localhost:3000/api/auth/';

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<IGetUsersResponse>(this.url + 'users');
    }

    /*getUserById(id: string){
      return this.http.get<IGetUserResponse>(this.url + 'users/' + id)
    }*/

    createUser(user: IUser) {
        return this.http.post<ICreateUsersResponse>(this.url + 'register', user);
    }

    deleteUser(userId: string) {
        //return this.http.delete
    }

    loginUser(credentials: { userEmail: string, userPassword: string }) {
        return this.http.post(this.url + 'login', credentials);
    }

    isLoggedIn() {
        const helper = new JwtHelperService();
        let token = localStorage.getItem('token');
        if (!token) return null;
        return !helper.isTokenExpired(token);
    }

    get user() {
        let token = localStorage.getItem('token');
        if (!token) return null;

        const helper = new JwtHelperService();
        return helper.decodeToken(token);
    }

}
