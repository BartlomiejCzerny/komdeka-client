import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersListComponent } from '../suppliers-list/suppliers-list.component';
import { SupplierDetailsComponent } from '../supplier-details/supplier-details.component';
import { SupplierAddComponent } from '../supplier-add/supplier-add.component';
import { SupplierEditComponent } from '../supplier-edit/supplier-edit.component';
import { SupplierDeleteComponent } from '../supplier-delete/supplier-delete.component';
import { AdminGuard } from '../../shared/guards/admin.guard';

const routes: Routes = [
  { path: 'suppliers-list', component: SuppliersListComponent },
  { path: 'supplier-details/:id', component: SupplierDetailsComponent },
  { path: 'supplier-add', component: SupplierAddComponent, canActivate: [AdminGuard]},
  { path: 'supplier-edit/:id', component: SupplierEditComponent },
  { path: 'supplier-delete/:id', component: SupplierDeleteComponent, canActivate: [AdminGuard]}
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
export class SuppliersRoutingModule { }
