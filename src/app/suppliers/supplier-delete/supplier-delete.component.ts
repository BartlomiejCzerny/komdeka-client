import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Supplier } from '../../interfaces/supplier/supplier.interface';
import { SupplierService } from '../../shared/services/supplier.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrls: ['./supplier-delete.component.scss']
})
export class SupplierDeleteComponent implements OnInit {
  supplier: Supplier;

  errorMessage: string;
  showError: boolean;

  constructor(
    private supplierService: SupplierService,
    private errorHandlerService: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
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

  deleteSupplier() {
    const deleteUri: string = `api/suppliers/${this.supplier.idNumber}`;
    this.supplierService.deleteSupplier(deleteUri)
      .subscribe(() => {
        this.redirectToSuppliersList();
        this.openSupplierDeleteSnackbar();
      },
        ((error) => {
          this.errorMessage = error;
          this.showError = true;
        })
      );
  }

  redirectToSuppliersList() {
    this.router.navigate(['/suppliers/suppliers-list']);
  }

  openSupplierDeleteSnackbar() {
    this.snackBar.open('Dostawca został usunięty pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
