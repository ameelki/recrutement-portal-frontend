import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../sevice/auth.service';
import { JobDescriptionService } from '../../sevice/job-description.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe, NgForOf } from '@angular/common';
import { SharedModule } from '../../theme/shared/shared.module';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule, SharedModule, Card, Button, Paginator],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobList$: Observable<any[]>;
  constructor(private service: JobDescriptionService) {}
  ngOnInit(): void {
    this.jobList$ = this.service.getJobDescriptions();
  }
}
