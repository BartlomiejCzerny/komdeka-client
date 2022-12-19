import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../interfaces/order/order.interface';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  orderFormGroup: FormGroup;

  errorMessage: string;
  showError: boolean;

  stepperOrientation: Observable<StepperOrientation>;

  get orderFormArray(): AbstractControl | null { return this.orderFormGroup.get('orderFormArray'); }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar,
    breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.orderFormGroup = this.formBuilder.group({
      orderFormArray: this.formBuilder.array([
        this.formBuilder.group({
          //Karta zamówienia
          idNumber: ['', Validators.required],
          orderNumber: new FormControl('', [
            Validators.required,
            Validators.maxLength(15)
          ]),
          customerName: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
          ]),
          street: new FormControl('', [
            Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*'),
            Validators.maxLength(255)
          ]),
          buildingNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('[0-9a-zA-Z /]*'),
            Validators.maxLength(15)
          ]),
          zipCode: new FormControl('', [
            Validators.required,
            Validators.pattern('[0-9]{2}-[0-9]{3}')
          ]),
          place: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*'),
            Validators.maxLength(255)
          ]),
          customerFirstName: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
          ]),
          customerLastName: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
          ]),
          admissionOrderDate: new FormControl([
            Validators.required
          ]),
          orderDescription: new FormControl('', [
            Validators.required,
            Validators.maxLength(5000)
          ]),
          orderComments: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          customerSignature: new FormControl('', [
            Validators.required
          ]),
          contractorSignature: new FormControl('', [
            Validators.required
          ]),
        }),

        this.formBuilder.group({
          //Przegląd zamówienia
          areRequirementsDefined: new FormControl('', [
            Validators.required
          ]),
          areDocumentsUpToDate: new FormControl('', [
            Validators.required
          ]),
          areQualityApprovalsUpToDate: new FormControl('', [
            Validators.required
          ]),
          haveSuppliersApprovals: new FormControl('', [
            Validators.required
          ]),
          haveProductionAndEquipmentProcedures: new FormControl('', [
            Validators.required
          ]),
          haveControlProcedures: new FormControl('', [
            Validators.required
          ]),
          haveTheResources: new FormControl('', [
            Validators.required
          ]),
          haveEmployeesAndSkills: new FormControl('', [
            Validators.required
          ]),
          areFirstPieceRequirementsDefined: new FormControl('', [
            Validators.required
          ]),
          haveWarehousesAndResources: new FormControl('', [
            Validators.required
          ]),
          hasRiskAssessed: new FormControl('', [
            Validators.required
          ]),
          isPriceCorrect: new FormControl('', [
            Validators.required
          ]),
          areDeliveryTermsChecked: new FormControl('', [
            Validators.required
          ]),
        }),

        this.formBuilder.group({
          //Wymagania do zamówienia
          orderNum: new FormControl('', [
            Validators.required,
            Validators.maxLength(15)
          ]),
          orderRequirements: new FormControl('', [
            Validators.required,
            Validators.maxLength(5000)
          ]),
          requirementsEstablishedDate: new FormControl([
            Validators.required
          ]),
          orderingPersonSignature: new FormControl('', [
            Validators.required
          ]),
        }),

        this.formBuilder.group({
          //Karta projektu
          projectCardNumber: new FormControl('', [
            Validators.required,
            Validators.maxLength(15)
          ]),
          orderNo: new FormControl('', [
            Validators.required,
            Validators.maxLength(15)
          ]),
          orderingPersonName: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
          ]),
          projectTeam: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          documentName: new FormControl('', [
            Validators.maxLength(255)
          ]),
          documentNumber: new FormControl('', [
            Validators.required,
            Validators.maxLength(15)
          ]),
          comments: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          reviewResult: new FormControl('', [
            Validators.required,
            Validators.maxLength(5000)
          ]),
          identifiedProblems: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          plannedActivities: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          verificationResult: new FormControl('', [
            Validators.required,
            Validators.maxLength(5000)
          ]),
          encounteredProblems: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          plannedWorks: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          validationResult: new FormControl('', [
            Validators.required,
            Validators.maxLength(5000)
          ]),
          problems: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          activities: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          descriptionOfChange: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          shiftCardNumber: new FormControl('', [
            Validators.maxLength(15)
          ]),
          docName: new FormControl('', [
            Validators.maxLength(255)
          ]),
          documentOrDrawingNumber: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
          ]),
          remarks: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          additionalInformation: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          additionalComments: new FormControl('', [
            Validators.maxLength(5000)
          ]),
          projectApproval: new FormControl('', [
            Validators.required,
            Validators.maxLength(5000)
          ]),
          designTeamSignatures: new FormControl('', [
            Validators.required
          ]),
        }),

        this.formBuilder.group({
          //Przewodnik pracy
          jobGuideNumber: new FormControl('', [
            Validators.required,
            Validators.maxLength(15)
          ]),
          releaseDate: new FormControl([
            Validators.required
          ]),
          customer: new FormControl([
            Validators.required,
            Validators.maxLength(255)
          ]),
          productName: new FormControl([
            Validators.required,
            Validators.maxLength(255)
          ]),
          drawingNumber: new FormControl([
            Validators.required,
            Validators.maxLength(15)
          ]),
          drawingRelease: new FormControl([
            Validators.required,
            Validators.maxLength(15)
          ]),
          material: new FormControl([
            Validators.required,
            Validators.maxLength(15)
          ]),
          meltCertificateProof: new FormControl([
            Validators.required,
            Validators.maxLength(255)
          ]),
          orderNr: new FormControl([
            Validators.required,
            Validators.maxLength(15)
          ]),
          quantity: new FormControl([
            Validators.required,
            Validators.maxLength(15)
          ]),
          jobGuideContent: new FormControl([
            Validators.required,
            Validators.maxLength(5000)
          ]),
        }),

        this.formBuilder.group({
          //Świadectwo jakości
          qualityCertificateNumber: new FormControl([
            Validators.required,
            Validators.maxLength(15)
          ]),
          purchaser: new FormControl([
            Validators.required,
            Validators.maxLength(255)
          ]),
          orderNbr: new FormControl([
            Validators.required,
            Validators.maxLength(15)
          ]),
          madeProducts: new FormControl([
            Validators.required,
            Validators.maxLength(5000)
          ]),
          remarksAndLimitations: new FormControl([
            Validators.maxLength(5000)
          ]),
          position: new FormControl([
            Validators.required,
            Validators.maxLength(255)
          ]),
          firstName: new FormControl([
            Validators.required,
            Validators.maxLength(255)
          ]),
          lastName: new FormControl([
            Validators.required,
            Validators.maxLength(255)
          ]),
          signature: new FormControl([
            Validators.required
          ]),
          date: new FormControl([
            Validators.required
          ]),
        }),

        this.formBuilder.group({
          //Ankieta zadowolenia klienta
          customerComments: new FormControl([
            Validators.maxLength(5000)
          ]),
          timeSatisfaction: new FormControl([
            Validators.required,
            Validators.pattern('[1-5]{1}')
          ]),
          qualitySatisfaction: new FormControl([
            Validators.required,
            Validators.pattern('[1-5]{1}')
          ]),
          clientSignature: new FormControl([
            Validators.required
          ]),
          executingPersonSignature: new FormControl([
            Validators.required
          ])
        })
      ])
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.orderFormGroup.controls[controlName].hasError(errorName);
  }

  public addOrder(orderFormValue: any) {
    if (this.orderFormGroup.valid) {
      this.executeOrderAdding(orderFormValue);
    }
  }

  private executeOrderAdding(orderFormValue: any) {
    const order: Order = {
      //Karta zamówienia
      idNumber: orderFormValue.idNumber,
      orderNumber: orderFormValue.orderNumber,
      customerName: orderFormValue.customerName,
      street: orderFormValue.street,
      buildingNumber: orderFormValue.buildingNumber,
      zipCode: orderFormValue.zipCode,
      place: orderFormValue.place,
      customerFirstName: orderFormValue.customerFirstName,
      customerLastName: orderFormValue.customerLastName,
      admissionOrderDate: orderFormValue.admissionOrderDate,
      orderDescription: orderFormValue.orderDescription,
      orderComments: orderFormValue.orderComments,
      customerSignature: orderFormValue.customerSignature,
      contractorSignature: orderFormValue.contractorSignature,

      //Przegląd zamówienia
      areRequirementsDefined: orderFormValue.areRequirementsDefined,
      areDocumentsUpToDate: orderFormValue.areDocumentsUpToDate,
      areQualityApprovalsUpToDate: orderFormValue.areQualityApprovalsUpToDate,
      haveSuppliersApprovals: orderFormValue.haveSuppliersApprovals,
      haveProductionAndEquipmentProcedures: orderFormValue.haveProductionAndEquipmentProcedures,
      haveControlProcedures: orderFormValue.haveControlProcedures,
      haveTheResources: orderFormValue.haveTheResources,
      haveEmployeesAndSkills: orderFormValue.haveEmployeesAndSkills,
      areFirstPieceRequirementsDefined: orderFormValue.areFirstPieceRequirementsDefined,
      haveWarehousesAndResources: orderFormValue.haveWarehousesAndResources,
      hasRiskAssessed: orderFormValue.hasRiskAssessed,
      isPriceCorrect: orderFormValue.isPriceCorrect,
      areDeliveryTermsChecked: orderFormValue.areDeliveryTermsChecked,

      //Wymagania do zamówienia
      orderNum: orderFormValue.orderNum,
      orderRequirements: orderFormValue.orderRequirements,
      requirementsEstablishedDate: orderFormValue.requirementsEstablishedDate,
      orderingPersonSignature: orderFormValue.orderingPersonSignature,

      //Karta projektu
      projectCardNumber: orderFormValue.projectCardNumber,
      orderNo: orderFormValue.orderNo,
      orderingPersonName: orderFormValue.orderingPersonName,
      projectTeam: orderFormValue.projectTeam,
      documentName: orderFormValue.documentName,
      documentNumber: orderFormValue.documentNumber,
      comments: orderFormValue.comments,
      reviewResult: orderFormValue.reviewResult,
      identifiedProblems: orderFormValue.identifiedProblems,
      plannedActivities: orderFormValue.plannedActivities,
      verificationResult: orderFormValue.verificationResult,
      encounteredProblems: orderFormValue.encounteredProblems,
      plannedWorks: orderFormValue.plannedWorks,
      validationResult: orderFormValue.validationResult,
      problems: orderFormValue.problems,
      activities: orderFormValue.activities,
      descriptionOfChange: orderFormValue.descriptionOfChange,
      shiftCardNumber: orderFormValue.shiftCardNumber,
      docName: orderFormValue.docName,
      documentOrDrawingNumber: orderFormValue.documentOrDrawingNumber,
      remarks: orderFormValue.remarks,
      additionalInformation: orderFormValue.additionalInformation,
      additionalComments: orderFormValue.additionalComments,
      projectApproval: orderFormValue.projectApproval,
      designTeamSignatures: orderFormValue.designTeamSignatures,

      //Przewodnik pracy
      jobGuideNumber: orderFormValue.jobGuideNumber,
      releaseDate: orderFormValue.releaseDate,
      customer: orderFormValue.customer,
      productName: orderFormValue.productName,
      drawingNumber: orderFormValue.drawingNumber,
      drawingRelease: orderFormValue.drawingRelease,
      material: orderFormValue.material,
      meltCertificateProof: orderFormValue.meltCertificateProof,
      orderNr: orderFormValue.orderNr,
      quantity: orderFormValue.quantity,
      jobGuideContent: orderFormValue.jobGuideContent,

      //Świadectwo jakości
      qualityCertificateNumber: orderFormValue.qualityCertificateNumber,
      purchaser: orderFormValue.purchaser,
      orderNbr: orderFormValue.orderNbr,
      madeProducts: orderFormValue.madeProducts,
      remarksAndLimitations: orderFormValue.remarksAndLimitations,
      position: orderFormValue.position,
      firstName: orderFormValue.firstName,
      lastName: orderFormValue.lastName,
      signature: orderFormValue.signature,
      date: orderFormValue.date,

      //Ankieta zadowolenia klienta
      customerComments: orderFormValue.customerComments,
      timeSatisfaction: orderFormValue.timeSatisfaction,
      qualitySatisfaction: orderFormValue.qualitySatisfaction,
      clientSignature: orderFormValue.clientSignature,
      executingPersonSignature: orderFormValue.executingPersonSignature
    };

    const apiUrl = 'api/orders';
    this.orderService.postOrder(apiUrl, order)
      .subscribe(() => {
        this.redirectToOrdersList();
        this.openOrderAddSnackbar();
      },
        ((error) => {
          this.errorMessage = error;
          this.showError = true;
        })
      );
  }

  redirectToOrdersList() {
    this.router.navigate(['/orders/orders-list']);
  }

  resetOrderForm() {
    this.orderFormGroup.reset();
  }

  openOrderAddSnackbar() {
    this.snackBar.open('Zamówienie zostało dodane pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
