import { Supplier } from './../../interfaces/supplier/supplier.interface';
import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {
  supplier: Supplier;

  constructor(
    private supplierService: SupplierService,
    private errorHandlerService: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSupplierById();
  }

  private getSupplierById = () => {
    const supplierId: string = this.activeRoute.snapshot.params['id'];
    const apiUri: string = `api/suppliers/${supplierId}`;
    this.supplierService.getSupplier(apiUri)
      .subscribe({
        next: (supplier: Supplier) => this.supplier = supplier,
        error: (err: HttpErrorResponse) => this.errorHandlerService.handleError(err)
      })
  }

  redirectToSuppliersList() {
    this.router.navigate(['/suppliers/suppliers-list']);
  }
}
