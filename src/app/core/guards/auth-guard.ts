import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const section = authService.current;
  const router = inject(Router);
  const now: number = Date.now();

  if(section.access_token) {
    if(section.expires_token > now){
      return true;
    }

    if(section.expires_refreh_token > now){
      return true;
    }
  }

  return router.createUrlTree(['login']); 
};
