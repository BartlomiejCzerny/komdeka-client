import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Order } from './../../interfaces/order/order.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  searchKey: string;

  public displayedColumns = [
    'idNumber',
    'orderNumber',
    'admissionOrderDate',
    'customerName',
    'orderReviewResult',
    'orderComments',
    'actions'
  ];

  ordersData = new MatTableDataSource<Order>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrder('api/orders')
    .subscribe(res => {
      this.ordersData.data = res as unknown as Order[];
    });
  }

  ngAfterViewInit(): void {
    this.ordersData.sort = this.sort;
    this.ordersData.paginator = this.paginator;
  }

  applyFilter() {
    this.ordersData.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearchKey() {
    this.searchKey = '';
    this.applyFilter();
  }

  redirectToAdd() {
    this.router.navigate(['/orders/order-add']);
  }

  redirectToDetails(id: any) {
    let url = `/orders/order-details/${id}`;
    this.router.navigate([url]);
  }

  redirectToEdit(id: any) {
    let url = `/orders/order-edit/${id}`;
    this.router.navigate([url]);
  }

  redirectToDelete(id: any) {
    let url = `/orders/order-delete/${id}`;
    this.router.navigate([url]);
  }
}
