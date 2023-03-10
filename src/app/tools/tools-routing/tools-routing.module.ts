import { ToolDeleteComponent } from './../tool-delete/tool-delete.component';
import { ToolEditComponent } from './../tool-edit/tool-edit.component';
import { ToolAddComponent } from './../tool-add/tool-add.component';
import { ToolDetailsComponent } from './../tool-details/tool-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToolsListComponent } from './../tools-list/tools-list.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';

const routes: Routes = [
  { path: 'tools-list', component: ToolsListComponent },
  { path: 'tool-details/:id', component: ToolDetailsComponent },
  { path: 'tool-add', component: ToolAddComponent, canActivate: [AdminGuard] },
  { path: 'tool-edit/:id', component: ToolEditComponent },
  { path: 'tool-delete/:id', component: ToolDeleteComponent, canActivate: [AdminGuard] }
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
export class ToolsRoutingModule {}
