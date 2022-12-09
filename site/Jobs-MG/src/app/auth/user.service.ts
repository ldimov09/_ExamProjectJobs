import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

interface IGetUsersResponse{
  success: boolean;
  result: IUser[];
}
interface ICreateUsersResponse{
  success: boolean;
  result: string;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:3000/api/auth/';

  constructor( private http: HttpClient) { }

  getUsers(){
    return this.http.get<IGetUsersResponse>(this.url + 'users');
  }

  createUser(user: IUser){
    return this.http.post<ICreateUsersResponse>(this.url + 'register', user);
  }

  deleteUser(userId: string){
    //return this.http.delete
  }

}
