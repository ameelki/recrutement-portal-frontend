// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import { UserService, UserSummary } from '../../sevice/user.service';
import { map, Observable } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { JobDescriptionResponse } from '../../models/job-description';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, Paginator],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  usersList$: Observable<any>;
   page: number=1;
   rows: number=5;
   loading: boolean;
   userListResponse: any;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.usersList$ = this.userService.getUsers().pipe(map((response) => this.handleResponse(response)));;
  }

  card = [
    {
      design: 'border-bottom',
      number: '235',
      text: 'TOTAL Candidates',
      icon: 'icon-zap text-c-green'
    },
    {
      number: '26',
      text: 'TOTAL job position',
      icon: 'icon-map-pin text-c-blue'
    }
  ];

  social_card = [
    {
      design: 'col-md-12',
      icon: 'fab fa-facebook-f text-primary',
      amount: '237 K followers',
      percentage: '228 K ',
      color: 'text-c-green'
    }
  ];

  tables = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Isabella Christensen',
      text: 'Lorem Ipsum is simply dummy',
      time: '11 MAY 12:56',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Ida Jorgensen',
      text: 'Lorem Ipsum is simply',
      time: '11 MAY 10:35',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      title: 'Mathilda Andersen',
      text: 'Lorem Ipsum is simply dummy',
      time: '9 MAY 17:38',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Karla Soreness',
      text: 'Lorem Ipsum is simply',
      time: '19 MAY 12:56',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Albert Andersen',
      text: 'Lorem Ipsum is',
      time: '21 July 12:56',
      color: 'text-c-green'
    }
  ];
  onPageChange(event: any) {
    this.page = event.page;
    this.rows = event.rows;
    this.loading=true;
    this.usersList$ = this.userService.getUsers(event.page+1, event.rows).pipe(map((response) => this.handleResponse(response)));
  }

  handleResponse(response: any): any {
    //To Do Response handling implementation
    this.userListResponse = response;
    this.loading=false;
    return response;
  }
}
