import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobDescriptionService } from '../../sevice/job-description.service';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe, NgForOf } from '@angular/common';
import { SharedModule } from '../../theme/shared/shared.module';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Paginator } from 'primeng/paginator';
import { JobDescriptionResponse } from '../../models/job-description';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule, SharedModule, Card, Button, Paginator, ProgressSpinner],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobList$: Observable<JobDescriptionResponse>;
  page: number = 0;
  rows: number = 9;
  jobDescriptionResponse: JobDescriptionResponse;
  loading: boolean;
  constructor(private service: JobDescriptionService,private router: Router) { }
  ngOnInit(): void {
    this.loading=true;
    this.jobList$ = this.service.getJobDescriptions().pipe(map((response) => this.handleResponse(response)));
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.rows = event.rows;
    this.loading=true;
    this.jobList$ = this.service.getJobDescriptions(event.page, event.rows).pipe(map((response) => this.handleResponse(response)));
  }

  handleResponse(response: JobDescriptionResponse): JobDescriptionResponse {
    //To Do Response handling implementation
    this.jobDescriptionResponse = response;
    this.loading=false;
    return response;
  }
  goTo(job:any):void{
    this.router.navigateByUrl(`/job-description/${job.id}`);

  }
}
