import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { JobDescriptionComponent } from './dashboard/job-description/job-description.component';
import { AuthGuard } from '../auth-guard';
import BasicElementsComponent from './demo/pages/form-elements/basic-elements/basic-elements.component';
import { JobListComponent } from './dashboard/job-list/job-list.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ClientListComponent } from './dashboard/client-list/client-list.component';
import { ClientComponent } from './dashboard/client/client.component';
import { JobDescriptionbyIdComponent } from './dashboard/job-descriptionby-id/job-descriptionby-id.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
 children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivateChild: [AuthGuard],

      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
        canActivateChild: [AuthGuard],

      },

      { path: 'job/create', component: JobDescriptionComponent,
        canActivateChild: [AuthGuard],
      } ,
      {
        path: 'list-job-for-candidate',
        component: JobListComponent,
        canActivateChild: [AuthGuard],
      },

   {
     path: 'job-description/:id',
     component: JobDescriptionbyIdComponent,
     canActivateChild: [AuthGuard],

   },
 {
     path: 'profile',
     component: ProfileComponent,
     canActivateChild: [AuthGuard],

   },

   {
     path: 'client/create',
     component: ClientComponent,
     canActivateChild: [AuthGuard],

   },
   {
     path: 'list-clients',
     component: ClientListComponent,
     canActivateChild: [AuthGuard],

   },
 ],
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
