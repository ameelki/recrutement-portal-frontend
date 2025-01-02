import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(authReq).pipe(
      // Gestion des erreurs HTTP
      catchError(err => {
        if (err.status === 401) {
          // Si le token a expiré ou est invalide (401), redirigez l'utilisateur
          localStorage.removeItem('accessToken'); // Supprime le token expiré
          // Rediriger vers la page de connexion avec un message pour l'expiration du token
          this.router.navigate(['/auth/signin'], { queryParams: { expired: true } });
        }
        return throwError(err); // Relancer l'erreur pour d'autres gestionnaires d'erreurs éventuels
      })
    );
  }  }
