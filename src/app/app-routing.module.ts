import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      {
        path: 'persona',
        loadChildren: () => import('./buscador/persona.module').then(m => m.PersonaModule),
        canActivate:[AuthGuard]
      },
      {
        path:'auditoria',
        loadChildren:()=>import('./buscador/persona.module').then(m => m.PersonaModule),
        canActivate: [AuthGuard]
      },
      {
        path:'auditoriaDocumento',
        loadChildren:()=>import('./buscador/persona.module').then(m => m.PersonaModule),
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
