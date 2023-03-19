import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../shared/services/supplier.service';
import { Supplier } from '../../interfaces/supplier/supplier.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  supplierForm: UntypedFormGroup;
  supplier: Supplier;

  errorMessage: string;
  showError: boolean;

  constructor(
    private supplierService: SupplierService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.supplierForm = new UntypedFormGroup({
      idNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      name: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      street: new UntypedFormControl('', [
        Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*'),
        Validators.maxLength(255)
      ]),
      buildingNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[0-9a-zA-Z /]*'),
        Validators.maxLength(15)
      ]),
      zipCode: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{2}-[0-9]{3}'),
        Validators.maxLength(6)
      ]),
      place: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*'),
        Validators.maxLength(255)
      ]),
      activitiesRange: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),
      approvalDate: new UntypedFormControl(),
      approvalExpirationDate: new UntypedFormControl(),
      remarks: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ])
    });

    this.getSupplierById();
  }

  public hasError(controlName: string, errorName: string) {
    return this.supplierForm.controls[controlName].hasError(errorName);
  }

  private getSupplierById() {
    let supplierId = this.activeRoute.snapshot.params['id'];
    let supplierByIdUrl = `api/suppliers/${supplierId}`;
    this.supplierService.getSupplier(supplierByIdUrl)
      .subscribe(res => {
        this.supplier = res as Supplier;
        this.supplierForm.patchValue(this.supplier);
      },
        ((error) => {
          this.errorMessage = error;
          this.showError = true;
        })
      );
  }

  public updateSupplier(supplierFormValue: any) {
    if (this.supplierForm.valid) {
      this.executeSupplierUpdate(supplierFormValue);
    }
  }

  private executeSupplierUpdate(supplierFormValue: any) {
    const supplier: Supplier = {
      idNumber: supplierFormValue.idNumber,
      name: supplierFormValue.name,
      street: supplierFormValue.street,
      buildingNumber: supplierFormValue.buildingNumber,
      zipCode: supplierFormValue.zipCode,
      place: supplierFormValue.place,
      activitiesRange: supplierFormValue.activitiesRange,
      approvalDate: supplierFormValue.approvalDate,
      approvalExpirationDate: supplierFormValue.approvalExpirationDate,
      remarks: supplierFormValue.remarks
    };

    let apiUrl = `api/suppliers/${this.supplier.idNumber}`;
    this.supplierService.putSupplier(apiUrl, supplier)
      .subscribe(() => {
        this.redirectToSuppliersList();
        this.openSupplierUpdateSnackbar();
      },
      ((error) => {
        this.errorMessage = error;
        this.showError = true;
      })
    )
  }

  redirectToSuppliersList() {
    this.router.navigate(['/suppliers/suppliers-list']);
  }

  resetSupplierForm() {
    this.supplierForm.reset();
  }

  openSupplierUpdateSnackbar() {
    this.snackBar.open('Dostawca został zaktualizowany pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
