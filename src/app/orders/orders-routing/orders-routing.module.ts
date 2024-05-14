import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { OrderAddComponent } from '../order-add/order-add.component';
import { OrderEditComponent } from '../order-edit/order-edit.component';
import { OrderDeleteComponent } from '../order-delete/order-delete.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';

const routes: Routes = [
  { path: 'orders-list', component: OrdersListComponent },
  { path: 'order-add', component: OrderAddComponent },
  { path: 'order-edit/:id', component: OrderEditComponent },
  { path: 'order-delete/:id', component: OrderDeleteComponent, canActivate: [AdminGuard] },
  { path: 'order-details/:id', component: OrderDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule { }
