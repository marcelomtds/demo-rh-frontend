import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'colaborador',
    loadChildren: () => import('./components/colaborador/colaborador.module').then(m => m.ColaboradorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cargo',
    loadChildren: () => import('./components/cargo/cargo.module').then(m => m.CargoModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
