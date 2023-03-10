import { AdminGuard } from './../shared/guards/admin.guard';
import { HomeComponent } from './../home/home.component';
import { AboutComponent } from './../about/about.component';
import { NotFoundComponent } from './../not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ForbiddenComponent } from '../forbidden/forbidden.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'authentication', loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'orders', loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
  { path: 'suppliers', loadChildren: () => import('../suppliers/suppliers.module').then(m => m.SuppliersModule), canActivate: [AuthGuard] },
  { path: 'tools', loadChildren: () => import('../tools/tools.module').then(m => m.ToolsModule), canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
