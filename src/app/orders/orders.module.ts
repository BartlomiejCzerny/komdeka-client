import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { OrdersRoutingModule } from './orders-routing/orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderDeleteComponent } from './order-delete/order-delete.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderDetailsComponent,
    OrderAddComponent,
    OrderEditComponent,
    OrderDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
