import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from './../../interfaces/supplier/supplier.interface';
import { SupplierService } from 'src/app/shared/services/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit {
  searchKey: string;

  public displayedColumns = [
    'idNumber',
    'name',
    'street',
    'buildingNumber',
    'zipCode',
    'place',
    'activitiesRange',
    'approvalDate',
    'approvalExpirationDate',
    'remarks',
    'actions'
  ];

  suppliersData = new MatTableDataSource<Supplier>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getSupplier('api/suppliers')
    .subscribe(res => {
      this.suppliersData.data = res as unknown as Supplier[];
    });
  }

  ngAfterViewInit(): void {
    this.suppliersData.sort = this.sort;
    this.suppliersData.paginator = this.paginator;
  }

  applyFilter() {
    this.suppliersData.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearchKey() {
    this.searchKey = '';
    this.applyFilter();
  }

  redirectToAdd() {
    this.router.navigate(['/suppliers/supplier-add']);
  }

  redirectToDetails(id: any) {
    let url = `/suppliers/supplier-details/${id}`;
    this.router.navigate([url]);
  }

  redirectToEdit(id: any) {
    let url = `/suppliers/supplier-edit/${id}`;
    this.router.navigate([url]);
  }

  redirectToDelete(id: any) {
    let url = `/suppliers/supplier-delete/${id}`;
    this.router.navigate([url]);
  }
}
