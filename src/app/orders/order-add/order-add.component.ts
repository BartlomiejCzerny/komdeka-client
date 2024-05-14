import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
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
  orderForm: UntypedFormGroup;

  orderNumber = '';
  orderNum: number;
  orderNo: number;
  documentNumber: string;
  documentOrDrawingNumber: string;
  drawingNumber: string;
  orderNr: number;
  orderNbr: number;

  autocompleteOrderNumber() {
    this.orderNum = +this.orderNumber;
    this.orderNo = +this.orderNumber;
    this.documentNumber = this.orderNumber.toString();
    this.documentOrDrawingNumber = this.orderNumber.toString();
    this.drawingNumber = this.orderNumber.toString();
    this.orderNr = +this.orderNumber;
    this.orderNbr = +this.orderNumber;
  }

  customerName = '';
  orderingPersonName: string;
  customer: string;
  purchaser: string;

  autocompleteCustomerName() {
    this.orderingPersonName = this.customerName;
    this.customer = this.orderingPersonName;
    this.purchaser = this.orderingPersonName;
  }

  projectCardNumber = '';
  jobGuideNumber: string;
  qualityCertificateNumber: string;

  autocompleteProjectCardNumber() {
    this.jobGuideNumber = this.projectCardNumber;
    this.qualityCertificateNumber = this.projectCardNumber;
  }


  customerSignature: Order[] = [
    { customerSignature: true, signatureStatus: 'Podpisano' },
    { customerSignature: false, signatureStatus: 'Nie podpisano' }
  ]

  contractorSignature: Order[] = [
    { contractorSignature: true, signatureStatus: 'Podpisano' },
    { contractorSignature: false, signatureStatus: 'Nie podpisano' }
  ]


  areRequirementsDefined: Order[] = [
    { areRequirementsDefined: true, orderReviewOption: 'Tak' },
    { areRequirementsDefined: false, orderReviewOption: 'Nie' }
  ]

  areDocumentsUpToDate: Order[] = [
    { areDocumentsUpToDate: true, orderReviewOption: 'Tak' },
    { areDocumentsUpToDate: false, orderReviewOption: 'Nie' }
  ]

  areQualityApprovalsUpToDate: Order[] = [
    { areQualityApprovalsUpToDate: true, orderReviewOption: 'Tak' },
    { areQualityApprovalsUpToDate: false, orderReviewOption: 'Nie' }
  ]

  haveSuppliersApprovals: Order[] = [
    { haveSuppliersApprovals: true, orderReviewOption: 'Tak' },
    { haveSuppliersApprovals: false, orderReviewOption: 'Nie' }
  ]

  haveProductionAndEquipmentProcedures: Order[] = [
    { haveProductionAndEquipmentProcedures: true, orderReviewOption: 'Tak' },
    { haveProductionAndEquipmentProcedures: false, orderReviewOption: 'Nie' }
  ]

  haveControlProcedures: Order[] = [
    { haveControlProcedures: true, orderReviewOption: 'Tak' },
    { haveControlProcedures: false, orderReviewOption: 'Nie' }
  ]

  haveTheResources: Order[] = [
    { haveTheResources: true, orderReviewOption: 'Tak' },
    { haveTheResources: false, orderReviewOption: 'Nie' }
  ]

  haveEmployeesAndSkills: Order[] = [
    { haveEmployeesAndSkills: true, orderReviewOption: 'Tak' },
    { haveEmployeesAndSkills: false, orderReviewOption: 'Nie' }
  ]

  areFirstPieceRequirementsDefined: Order[] = [
    { areFirstPieceRequirementsDefined: true, orderReviewOption: 'Tak' },
    { areFirstPieceRequirementsDefined: false, orderReviewOption: 'Nie' }
  ]

  haveWarehousesAndResources: Order[] = [
    { haveWarehousesAndResources: true, orderReviewOption: 'Tak' },
    { haveWarehousesAndResources: false, orderReviewOption: 'Nie' }
  ]

  hasRiskAssessed: Order[] = [
    { hasRiskAssessed: true, orderReviewOption: 'Tak' },
    { hasRiskAssessed: false, orderReviewOption: 'Nie' }
  ]

  isPriceCorrect: Order[] = [
    { isPriceCorrect: true, orderReviewOption: 'Tak' },
    { isPriceCorrect: false, orderReviewOption: 'Nie' }
  ]

  areDeliveryTermsChecked: Order[] = [
    { areDeliveryTermsChecked: true, orderReviewOption: 'Tak' },
    { areDeliveryTermsChecked: false, orderReviewOption: 'Nie' }
  ]


  orderingPersonSignature: Order[] = [
    { orderingPersonSignature: true, signatureStatus: 'Podpisano' },
    { orderingPersonSignature: false, signatureStatus: 'Nie podpisano' }
  ]


  designTeamSignatures: Order[] = [
    { designTeamSignatures: true, signatureStatus: 'Podpisano' },
    { designTeamSignatures: false, signatureStatus: 'Nie podpisano' }
  ]


  signature: Order[] = [
    { signature: true, signatureStatus: 'Podpisano' },
    { signature: false, signatureStatus: 'Nie podpisano' }
  ]


  clientSignature: Order[] = [
    { clientSignature: true, signatureStatus: 'Podpisano' },
    { clientSignature: false, signatureStatus: 'Nie podpisano' }
  ]

  executingPersonSignature: Order[] = [
    { executingPersonSignature: true, signatureStatus: 'Podpisano' },
    { executingPersonSignature: false, signatureStatus: 'Nie podpisano' }
  ]


  errorMessage: string;
  showError: boolean;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(max-width: 700px)')
      .pipe(map(({matches}) => (matches ? 'vertical' : 'horizontal')));
  }

  ngOnInit() {
    this.orderForm = new UntypedFormGroup({

      //Karta zamówienia
      idNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      orderNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      customerName: new UntypedFormControl('', [
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
      customerFirstName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      customerLastName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      admissionOrderDate: new UntypedFormControl('', [
        Validators.required
      ]),
      orderDescription: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      orderComments: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      customerSignature: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      contractorSignature: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),

      //Przegląd zamówienia
      areRequirementsDefined: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      areDocumentsUpToDate: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      areQualityApprovalsUpToDate: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      haveSuppliersApprovals: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      haveProductionAndEquipmentProcedures: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      haveControlProcedures: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      haveTheResources: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      haveEmployeesAndSkills: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      areFirstPieceRequirementsDefined: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      haveWarehousesAndResources: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      hasRiskAssessed: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      isPriceCorrect: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      areDeliveryTermsChecked: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      orderReviewResult: new UntypedFormControl(),

      //Wymagania do zamówienia
      orderNum: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      orderRequirements: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      requirementsEstablishedDate: new UntypedFormControl('', [
        Validators.required
      ]),
      orderingPersonSignature: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),

      //Karta projektu
      projectCardNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      orderNo: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      orderingPersonName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      projectTeam: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      documentName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      documentNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      comments: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      reviewResult: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      identifiedProblems: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      plannedActivities: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      verificationResult: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      encounteredProblems: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      plannedWorks: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      validationResult: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      problems: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      activities: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      descriptionOfChange: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      shiftCardNumber: new UntypedFormControl('', [
        Validators.maxLength(15)
      ]),
      docName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      documentOrDrawingNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      remarks: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      additionalInformation: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      additionalComments: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      projectApproval: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      designTeamSignatures: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),

      //Przewodnik pracy
      jobGuideNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      releaseDate: new UntypedFormControl('', [
        Validators.required
      ]),
      customer: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      productName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      drawingNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      drawingRelease: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      material: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      meltCertificateProof: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      orderNr: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      quantity: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      jobGuideContent: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),

      //Świadectwo jakości
      qualityCertificateNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      orderNbr: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      purchaser: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      madeProducts: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      remarksAndLimitations: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      position: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      firstName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      lastName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      signature: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      date: new UntypedFormControl('', [
        Validators.required
      ]),

      //Ankieta zadowolenia klienta
      customerComments: new UntypedFormControl('', [
        Validators.maxLength(5000)
      ]),
      timeSatisfaction: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[1-5]{1}')
      ]),
      qualitySatisfaction: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[1-5]{1}')
      ]),
      clientSignature: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      executingPersonSignature: new UntypedFormControl('', [
        Validators.requiredTrue
      ])
    });
  }



  addOrder(orderFormValue: any) {
    if (this.orderForm.valid) {
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
      orderReviewResult: orderFormValue.areRequirementsDefined === true
        && orderFormValue.areDocumentsUpToDate === true
        && orderFormValue.areQualityApprovalsUpToDate === true
        && orderFormValue.haveSuppliersApprovals === true
        && orderFormValue.haveProductionAndEquipmentProcedures === true
        && orderFormValue.haveControlProcedures === true
        && orderFormValue.haveTheResources === true
        && orderFormValue.haveEmployeesAndSkills === true
        && orderFormValue.areFirstPieceRequirementsDefined === true
        && orderFormValue.haveWarehousesAndResources === true
        && orderFormValue.hasRiskAssessed === true
        && orderFormValue.isPriceCorrect === true
        && orderFormValue.areDeliveryTermsChecked === true
        ? orderFormValue.orderReviewResult = true : false,

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
      orderNbr: orderFormValue.orderNbr,
      purchaser: orderFormValue.purchaser,
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
        this.openOrderAddSnackBar();
      },
        ((error) => {
          this.showError = true;
          this.errorMessage = error;
        })
      );
  }

  redirectToOrdersList() {
    this.router.navigate(['/orders/orders-list']);
  }

  resetOrderForm() {
    this.orderForm.reset();
  }

  openOrderAddSnackBar() {
    this.snackBar.open('Zamówienie zostało dodane pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
