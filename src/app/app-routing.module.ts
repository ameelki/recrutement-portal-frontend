import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { JobDescriptionComponent } from './dashboard/job-description/job-description.component';
import { AuthGuard } from '../auth-guard';

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

      { path: 'dashboard/job/create', component: JobDescriptionComponent,
        canActivateChild: [AuthGuard],
      } ,

      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule),
        canActivateChild: [AuthGuard],

      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule),
        canActivateChild: [AuthGuard],

      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule),
        canActivateChild: [AuthGuard],

      },
      {
        path: 'apexchart',
        loadComponent: () => import('./demo/chart/apex-chart/apex-chart.component'),
        canActivateChild: [AuthGuard],

      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/extra/sample-page/sample-page.component'),
        canActivateChild: [AuthGuard],

      }
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
