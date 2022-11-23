import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SuppliersRoutingModule } from './suppliers-routing/suppliers-routing.module';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierDeleteComponent } from './supplier-delete/supplier-delete.component';

@NgModule({
  declarations: [
    SuppliersListComponent,
    SupplierDetailsComponent,
    SupplierAddComponent,
    SupplierEditComponent,
    SupplierDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SuppliersRoutingModule
  ]
})
export class SuppliersModule { }
