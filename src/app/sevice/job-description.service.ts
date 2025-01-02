import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDescriptionRequest } from '../model/JobDescriptionRequest';
import { environment } from 'src/environments/environment';  // Importer l'environnement



@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {


  constructor(private http: HttpClient) { }

  createJobDescription(jobDescription: JobDescriptionRequest): Observable<JobDescriptionRequest> {
    return this.http.post<JobDescriptionRequest>(`${environment.apiBaseUrl}api/job-descriptions`, jobDescription);
  }
 /* getJobDescriptions(page: number = 0, size: number = 5): Observable<JobDescriptionPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<JobDescriptionPage>(this.api, { params });
  }

  
*/
  // Méthode pour récupérer une description de poste spécifique par son ID
  
  }