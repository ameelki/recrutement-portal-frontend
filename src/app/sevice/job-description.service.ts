import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDescriptionRequest } from '../model/JobDescriptionRequest';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../../auth-guard';
import { JobDescriptionResponse } from '../models/job-description';  // Importer l'environnement



@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {


  constructor(private http: HttpClient) { }

  createJobDescription(jobDescription: JobDescriptionRequest): Observable<JobDescriptionRequest> {
    return this.http.post<JobDescriptionRequest>(`/api/job-descriptions`, jobDescription);
  }


  updateJobDescription(jobDescription: JobDescriptionRequest,id:number): Observable<JobDescriptionRequest> {
    return this.http.put<JobDescriptionRequest>(`/api/job-descriptions/${id}`, jobDescription);
  }

  getJobDescriptions(page: number = 0, size: number = 9): Observable<JobDescriptionResponse> {
    return this.http.get<JobDescriptionResponse>(`/api/job-descriptions/user?page=${page}&size=${size}`);
  }

  getJobDescriptionsById(id: number): Observable<any> {
    return this.http.get<any>(`/api/job-descriptions/${id}`);
  }

  // Méthode pour récupérer une description de poste spécifique par son ID

  }
