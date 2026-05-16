import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
    {path: 'login',canActivate: [loginGuard], loadComponent: () => import('./pages/login/login').then(m => m.Login)},
];
