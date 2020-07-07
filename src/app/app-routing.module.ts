import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "admin", canActivate:[AuthGuard], loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: "home", loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule) },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules,scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
