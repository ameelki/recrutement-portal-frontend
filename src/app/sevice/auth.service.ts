import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { JwtPayload } from './user.service';


// Interface pour les données de réponse
export interface AccessTokenAuthorization {
  // Définir les propriétés nécessaires
  token: string;
  // Ajouter d'autres propriétés si nécessaire
}
export interface PasswordResetRequest {
  email: string;
  newPassword: string;
}



  export interface LoginFormRequest {
    username: string;
    password: string;
  }

  // Définir l'interface pour la réponse de l'authentification
  export interface AccessTokenAuthorization {
    accessToken: string;
    // Ajoutez d'autres propriétés selon votre réponse
  }

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    private authenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient,private router: Router){
    // Simuler l'état d'authentification
    const isAuthenticated = !!localStorage.getItem('accessToken');
    this.authenticatedSubject.next(isAuthenticated);
  }
    private apiUrl = `/user/login`; // Assurez-vous que l'URL est correcte



    login(loginFormRequest: LoginFormRequest): Observable<AccessTokenAuthorization> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post<AccessTokenAuthorization>(this.apiUrl, loginFormRequest, { headers });
    }

    decodeToken(token: string): { roles: string[] } {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const roles = decoded.realm_access?.roles || [];
        return { roles };
      } catch (error) {
        console.error('Token decoding failed', error);
        return { roles: [] };
      }
    }
    getToken(): string | null {
      return localStorage.getItem('accessToken');
    }



    // Vérifie si l'utilisateur est authentifié
    isAuthenticated(): boolean {
      return !!localStorage.getItem('accessToken');
    }

    // Vérifie si l'utilisateur a un rôle spécifique
    hasRole(expectedRole: string): boolean {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return false;
      }
      const { roles } = this.decodeToken(token);
      return roles.includes(expectedRole);
    }
    navigateBasedOnRole(roles: string[]): void {
      if (roles.includes('superAdmin')) {
        this.router.navigate(['users']);
      } else if (roles.includes('user')) {
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/access-denied']);
      }
    }
}
