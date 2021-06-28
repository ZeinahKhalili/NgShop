import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService as AuthGuard } from './core/guards/auth-guard.service';
import { LoginAuthGuard as AuthGuardUser } from './core/guards/auth-user-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () =>
      import(
        './modules/authentication/authentication/authentication.module'
      ).then((m) => m.AuthenticationModule),
    canActivate: [AuthGuardUser],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
