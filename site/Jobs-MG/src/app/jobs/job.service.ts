import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<IGetJobResponse>(this.url + 'details/' +  id);
  }

  updateJob(job: IJob, jobId: string) {
    return this.http.put<IGetJobResponse>(this.url + 'edit/' + jobId, job);
  }

  createJob(job: IJob) {
    return this.http.post<ICreateJobResponse>(this.url + 'create', job); 
  }

  updateJobReactions(reactionUpdate: any) {
    return this.http.put(this.url + 'react', reactionUpdate);
  }

  updateUserApplications(applicationUpdate: any){
    return this.http.put(this.url + 'apply', applicationUpdate);
  }
  updateUserFavorites(favoritesUpdate: any){
    return this.http.put(this.url + 'favor', favoritesUpdate);
  }

  deleteJob(jobId?: string) {
    return this.http.delete(this.url + jobId);
  }
}
