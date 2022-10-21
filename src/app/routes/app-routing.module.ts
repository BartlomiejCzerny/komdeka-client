// import { PrivacyComponent } from './../privacy/privacy.component';
import { HomeComponent } from './../home/home.component';
// import { OrdersComponent } from '../orders/orders.component';
// import { ToolsComponent } from '../tools/tools.component';
import { AboutComponent } from './../about/about.component';
import { NotFoundComponent } from './../not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'authentication', loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule) },
  // { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  // { path: 'providers', component: ProvidersComponent, canActivate: [AuthGuard] },
  { path: 'tools', loadChildren: () => import('../tools/tools.module').then(m => m.ToolsModule) },
  // { path: 'privacy', component: PrivacyComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
