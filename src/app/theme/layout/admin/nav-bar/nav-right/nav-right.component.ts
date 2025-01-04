// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../../../../sevice/user.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {

  constructor(private router:Router) { }

  logout():void{
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }


  getUserName():string {

    const token = localStorage.getItem("accessToken");
    if(token!==undefined && token!=null){


return this.decodeToken(token)
    }
    return ""
  }


  decodeToken(token: string): string {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded?.email || "";
      return username;
    } catch (error) {
      console.error('Token decoding failed', error);
      return "";
    }
  }
  ngOnInit(): void {
  }
  goTo(route:string){
    this.router.navigate([`/${route}`]);
  }
}
