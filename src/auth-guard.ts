import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { window } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  implements CanActivate{

  private authenticated:boolean=false
  roles:string[]=[];
  constructor(
    protected  readonly router: Router
  ) {
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
  const token:string =  localStorage.getItem("accessToken");
  // Force the user to log in if currently unauthenticated.
    if (token==undefined) {

      this.router.navigate(["/auth/signin"])

    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    if (requiredRoles.every((role) => this.roles.includes(role))) {
      return true;
    } else {
      // redirect to error page if the user doesn't have the nessecairy  role to access
      // we will define this routes in a bit
      this.router.navigate(['access-denied']);
      return false;
    }
  }


  isRoleAvailable(role:string,route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'];
    return requiredRoles.includes(role);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const token:string =  localStorage.getItem("accessToken");
 // Force the user to log in if currently unauthenticated.
    if (token==undefined) {

      this.router.navigate(["/auth/signin"])

    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    if (requiredRoles.every((role) => this.roles.includes(role))) {
      return true;
    } else {
      // redirect to error page if the user doesn't have the nessecairy  role to access
      // we will define this routes in a bit
      this.router.navigate(['access-denied']);
      return false;
    }
  }
}
