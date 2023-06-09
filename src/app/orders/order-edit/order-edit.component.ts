import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../interfaces/order/order.interface';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  orderForm: UntypedFormGroup;
  order: Order;

  orderNumber: number;

  customerSignature: Order[] = [
    { customerSignature: true, signatureOption: 'Podpisano' },
    { customerSignature: false, signatureOption: 'Nie podpisano' }
  ]

  contractorSignature: Order[] = [
    { contractorSignature: true, signatureOption: 'Podpisano' },
    { contractorSignature: false, signatureOption: 'Nie podpisano' }
  ]


  areRequirementsDefined: Order[] = [
    { areRequirementsDefined: true, orderReviewOption: 'Tak' },
    { areRequirementsDefined: false, orderReviewOption: 'Nie' },
    { areRequirementsDefined: true, orderReviewOption: 'Nie dotyczy' }
  ]

  areDocumentsUpToDate: Order[] = [
    { areDocumentsUpToDate: true, orderReviewOption: 'Tak' },
    { areDocumentsUpToDate: false, orderReviewOption: 'Nie' },
    { areDocumentsUpToDate: true, orderReviewOption: 'Nie dotyczy' }
  ]

  areQualityApprovalsUpToDate: Order[] = [
    { areQualityApprovalsUpToDate: true, orderReviewOption: 'Tak' },
    { areQualityApprovalsUpToDate: false, orderReviewOption: 'Nie' },
    { areQualityApprovalsUpToDate: true, orderReviewOption: 'Nie dotyczy' }
  ]

  haveSuppliersApprovals: Order[] = [
    { haveSuppliersApprovals: true, orderReviewOption: 'Tak' },
    { haveSuppliersApprovals: false, orderReviewOption: 'Nie' },
    { haveSuppliersApprovals: true, orderReviewOption: 'Nie dotyczy' }
  ]

  haveProductionAndEquipmentProcedures: Order[] = [
    { haveProductionAndEquipmentProcedures: true, orderReviewOption: 'Tak' },
    { haveProductionAndEquipmentProcedures: false, orderReviewOption: 'Nie' },
    { haveProductionAndEquipmentProcedures: true, orderReviewOption: 'Nie dotyczy' }
  ]

  haveControlProcedures: Order[] = [
    { haveControlProcedures: true, orderReviewOption: 'Tak' },
    { haveControlProcedures: false, orderReviewOption: 'Nie' },
    { haveControlProcedures: true, orderReviewOption: 'Nie dotyczy' }
  ]

  haveTheResources: Order[] = [
    { haveTheResources: true, orderReviewOption: 'Tak' },
    { haveTheResources: false, orderReviewOption: 'Nie' },
    { haveTheResources: true, orderReviewOption: 'Nie dotyczy' }
  ]

  haveEmployeesAndSkills: Order[] = [
    { haveEmployeesAndSkills: true, orderReviewOption: 'Tak' },
    { haveEmployeesAndSkills: false, orderReviewOption: 'Nie' },
    { haveEmployeesAndSkills: true, orderReviewOption: 'Nie dotyczy' }
  ]

  areFirstPieceRequirementsDefined: Order[] = [
    { areFirstPieceRequirementsDefined: true, orderReviewOption: 'Tak' },
    { areFirstPieceRequirementsDefined: false, orderReviewOption: 'Nie' },
    { areFirstPieceRequirementsDefined: true, orderReviewOption: 'Nie dotyczy' }
  ]

  haveWarehousesAndResources: Order[] = [
    { haveWarehousesAndResources: true, orderReviewOption: 'Tak' },
    { haveWarehousesAndResources: false, orderReviewOption: 'Nie' },
    { haveWarehousesAndResources: true, orderReviewOption: 'Nie dotyczy' }
  ]

  hasRiskAssessed: Order[] = [
    { hasRiskAssessed: true, orderReviewOption: 'Tak' },
    { hasRiskAssessed: false, orderReviewOption: 'Nie' },
    { hasRiskAssessed: true, orderReviewOption: 'Nie dotyczy' }
  ]

  isPriceCorrect: Order[] = [
    { isPriceCorrect: true, orderReviewOption: 'Tak' },
    { isPriceCorrect: false, orderReviewOption: 'Nie' },
    { isPriceCorrect: true, orderReviewOption: 'Nie dotyczy' }
  ]

  areDeliveryTermsChecked: Order[] = [
    { areDeliveryTermsChecked: true, orderReviewOption: 'Tak' },
    { areDeliveryTermsChecked: false, orderReviewOption: 'Nie' },
    { areDeliveryTermsChecked: true, orderReviewOption: 'Nie dotyczy' }
  ]


  orderingPersonSignature: Order[] = [
    { orderingPersonSignature: true, signatureOption: 'Podpisano' },
    { orderingPersonSignature: false, signatureOption: 'Nie podpisano' }
  ]


  designTeamSignatures: Order[] = [
    { designTeamSignatures: true, signatureOption: 'Podpisano' },
    { designTeamSignatures: false, signatureOption: 'Nie podpisano' }
  ]


  signature: Order[] = [
    { signature: true, signatureOption: 'Podpisano' },
    { signature: false, signatureOption: 'Nie podpisano' }
  ]


  clientSignature: Order[] = [
    { clientSignature: true, signatureOption: 'Podpisano' },
    { clientSignature: false, signatureOption: 'Nie podpisano' }
  ]

  executingPersonSignature: Order[] = [
    { executingPersonSignature: true, signatureOption: 'Podpisano' },
    { executingPersonSignature: false, signatureOption: 'Nie podpisano' }
  ]


  errorMessage: string;
  showError: boolean;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
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
        Validators.maxLength(5000)
      ]),
      documentName: new UntypedFormControl('', [
        Validators.maxLength(255)
      ]),
      documentNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
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

    this.getOrderById();
  }

  private getOrderById() {
    let orderId = this.activeRoute.snapshot.params['id'];
    let orderByIdUrl = `api/orders/${orderId}`;
    this.orderService.getOrder(orderByIdUrl)
      .subscribe(res => {
        this.order = res as Order;
        this.orderForm.patchValue(this.order);
      },
        ((error) => {
          this.errorMessage = error;
          this.showError = true;
        })
      );
  }

  updateOrder(orderFormValue: any) {
    if (this.orderForm.valid) {
      this.executeOrderUpdate(orderFormValue);
    }
  }

  private executeOrderUpdate(orderFormValue: any) {
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

    let apiUrl = `api/orders/${this.order.idNumber}`;
    this.orderService.putOrder(apiUrl, order)
      .subscribe(() => {
        this.redirectToOrdersList();
        this.openOrderUpdateSnackbar();
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
    this.orderForm.reset();
  }

  openOrderUpdateSnackbar() {
    this.snackBar.open('Zamówienie zostało zaktualizowane pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
