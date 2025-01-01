import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}



@Injectable()
export class NavigationItem {


  getNavigation(roles:any):any[ ]  {

    return [
      {
        id: 'navigation',
        title: 'Navigation',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: 'feather icon-home',
            classes: 'nav-item'
          }
        ]
      }, {
        id: 'forms',
        title: 'job Position',
        type: 'group',
        icon: 'icon-group',
        children: [
          {
            hidden: !(roles.includes('client') || roles.includes('premium')),
            id: 'forms-element',
            title: 'create job position',
            type: 'item',
            url: '/dashboard/job/create',
            classes: 'nav-item',
            icon: 'feather icon-file-text'
          },
          {
            hidden: !(roles.includes('candidate') || roles.includes('premium')),
            id: 'tables',
            title: 'jobs',
            type: 'item',
            url: '/jobs/list',
            classes: 'nav-item',
            icon: 'feather icon-server'
          }
        ]
      }
    ];

}
  get() {
  const roles = JSON.parse(localStorage.getItem("roles") != undefined ? localStorage.getItem("roles") : "[]");
  return this.getNavigation(roles);
  }
}
