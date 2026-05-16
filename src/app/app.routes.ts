import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login-guard';
import { Master } from './pages/master/master';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: 'login',canActivate: [loginGuard], loadComponent: () => import('./pages/login/login').then(m => m.Login) },
    { path: '', canActivate: [authGuard], component: Master
        , children: [
            { path: '', loadComponent: () => import('./pages/master/agendamentos/agendamentos').then(m => m.Agendamentos) },
            { path: 'agendamento/:id', loadComponent: () => import('./pages/master/agendamentos/agendamento/agendamento').then(m => m.Agendamento) },
            { path: 'agendamento/:id/galeria', loadComponent: () => import('./pages/master/agendamentos/agendamento/galeria/galeria').then(m => m.Galeria) },
            { path: 'agendamento/:id/atendimentos', loadComponent: () => import('./pages/master/agendamentos/agendamento/atendimentos/atendimentos').then(m => m.Atendimentos) },
            { path: 'agendamento/:id/atendimentos/novoatendimento', loadComponent: () => import('./pages/master/agendamentos/agendamento/atendimentos/novoatendimento/novoatendimento').then(m => m.Novoatendimento) },
            { path: 'notificacoes', loadComponent: () => import('./pages/master/notificacoes/notificacoes').then(m => m.Notificacoes) },
        ]
    },
    { path: 'error', loadComponent: () => import('./pages/error/error').then(m => m.Error) },
    { path: '**', redirectTo: 'error' }
];
