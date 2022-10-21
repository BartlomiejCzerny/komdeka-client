import { Component, OnInit } from '@angular/core';
import { ToolService } from '../shared/services/tool.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderDialogComponent } from './add-order-dialog/add-order-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {


  // openAddOrderDialog() {
  //   const dialogRef = this.dialog.open(AddOrderDialogComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
