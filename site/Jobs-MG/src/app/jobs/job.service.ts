import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IJob } from '../interfaces/job.interface';

interface IGetAllJobsResponse {
  result: IJob[];
  success: boolean;
}

interface ICreateJobResponse {
  result: string;
  success: boolean;
}

interface IGetJobResponse {
  result: IJob;
  success: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url: string = 'http://localhost:3000/api/jobs/';


  constructor(private http: HttpClient) { }

  getAllJobs() {
    return this.http.get<IGetAllJobsResponse>(this.url);
  }
  getJob(id: string) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set("authorization",  token!);


    return this.http.get<IGetJobResponse>(this.url + 'details/' +  id,  {headers});
  }

  updateJob(job: IJob, jobId: string) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set("authorization", token!);
    return this.http.put<IGetJobResponse>(this.url + 'edit/' + jobId, job, {headers});
  }

  createJob(job: IJob) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set("authorization", token!);
    return this.http.post<ICreateJobResponse>(this.url + 'create', job, {headers}); 
  }

  updateJobReactions(reactionUpdate: any) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set("authorization", token!);
    return this.http.put(this.url + 'react', reactionUpdate, {headers});
  }

  updateUserApplications(applicationUpdate: any){
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set("authorization", token!);
    return this.http.put(this.url + 'apply', applicationUpdate, {headers});
  }
  updateUserFavorites(favoritesUpdate: any){
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set("authorization", token!);
    return this.http.put(this.url + 'favor', favoritesUpdate, {headers});
  }

  deleteJob(jobId?: string) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set("authorization", token!);
    return this.http.delete(this.url + jobId ,{headers});
  }
}
