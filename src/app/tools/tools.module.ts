import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ToolsRoutingModule } from './tools-routing/tools-routing.module';
import { ToolsListComponent } from './tools-list/tools-list.component';
import { ToolDetailsComponent } from './tool-details/tool-details.component';
import { ToolAddComponent } from './tool-add/tool-add.component';
import { ToolEditComponent } from './tool-edit/tool-edit.component';
import { ToolDeleteComponent } from './tool-delete/tool-delete.component';

@NgModule({
  declarations: [
    ToolsListComponent,
    ToolDetailsComponent,
    ToolAddComponent,
    ToolEditComponent,
    ToolDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule {}
