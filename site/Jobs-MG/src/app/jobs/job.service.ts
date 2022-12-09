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


@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url: string = 'http://localhost:3000/api/jobs/';


  constructor(private http: HttpClient) { }

  getAllJobs() {
    return this.http.get<IGetAllJobsResponse>(this.url);
  }

  createJob(job: IJob) {
    return this.http.post<ICreateJobResponse>(this.url + 'create', job); 
  }

  updateJobReactions(reactionUpdate: any) {
    return this.http.put(this.url + 'react', reactionUpdate);
  }
}
