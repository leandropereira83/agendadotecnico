import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const section = authService.current;
  const router = inject(Router);
  const now: number = Date.now();

  if(section.access_token) {
    if(section.expires_token > now){
      return router.createUrlTree(['']);
    }

    if(section.expires_refreh_token > now){
      authService.getSection().subscribe();
      return router.createUrlTree(['']);
    }
  }

  return true;
};
