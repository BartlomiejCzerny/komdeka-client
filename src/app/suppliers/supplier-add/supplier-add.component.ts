import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { Supplier } from '../../interfaces/supplier/supplier.interface';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent implements OnInit {
  supplierForm: UntypedFormGroup;

  errorMessage: string;
  showError: boolean;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private snackBar: MatSnackBar
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
        Validators.pattern('[0-9]{2}-[0-9]{3}')
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
      approvalDate: new UntypedFormControl('',[
        Validators.required
      ]),
      approvalExpirationDate: new UntypedFormControl('',[
        Validators.required
      ]),
      remarks: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ])
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.supplierForm.controls[controlName].hasError(errorName);
  }

  public addSupplier(supplierFormValue: any) {
    if (this.supplierForm.valid) {
      this.executeSupplierAdding(supplierFormValue);
    }
  }

  private executeSupplierAdding(supplierFormValue: any) {
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

    const apiUrl = 'api/suppliers';
    this.supplierService.postSupplier(apiUrl, supplier)
      .subscribe(() => {
        this.redirectToSuppliersList();
        this.openSupplierAddSnackbar();
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

  resetSupplierForm() {
    this.supplierForm.reset();
  }

  openSupplierAddSnackbar() {
    this.snackBar.open('Dostawca został dodany pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
