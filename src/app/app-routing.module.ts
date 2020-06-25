import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardaGuard } from './guardias/guarda.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate : [GuardaGuard]},
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'crear-ususario',
    loadChildren: () => import('./crear-ususario/crear-ususario.module').then( m => m.CrearUsusarioPageModule)
  },
  {
    path: 'mainmenu',
    loadChildren: () => import('./mainmenu/mainmenu.module').then( m => m.MainmenuPageModule),canActivate : [GuardaGuard]
  },
  {
    path: 'heatmap',
    loadChildren: () => import('./heatmap/heatmap.module').then( m => m.HeatmapPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
