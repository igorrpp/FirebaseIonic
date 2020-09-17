import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {àuthGuardPipe : redirectToLogin}
  },
  {
    path: 'clientes-novo',
    loadChildren: () => import('./clientes-novo/clientes-novo.module').then( m => m.ClientesNovoPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {àuthGuardPipe : redirectToLogin}
  
  },
  
  {
    path: 'clientes-detalhe/:id',
    loadChildren: () => import('./clientes-detalhe/clientes-detalhe.module').then( m => m.ClientesDetalhePageModule),
    canActivate : [AngularFireAuthGuard],
    data : {àuthGuardPipe : redirectToLogin}
  },
  
  {
    path: 'logoff',
    loadChildren: () => import('./logoff/logoff.module').then( m => m.LogoffPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {àuthGuardPipe : redirectToLogin}
  },
  {
    path: 'clientes-delete/:id',
    loadChildren: () => import('./clientes-delete/clientes-delete.module').then( m => m.ClientesDeletePageModule),
    canActivate : [AngularFireAuthGuard],
    data : {àuthGuardPipe : redirectToLogin}
  },
  {
    path: 'clientes-update/:id',
    loadChildren: () => import('./clientes-update/clientes-update.module').then( m => m.ClientesUpdatePageModule)
  },
  {
    path: 'clientes-foto/:id',
    loadChildren: () => import('./clientes-foto/clientes-foto.module').then( m => m.ClientesFotoPageModule)
  },
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
