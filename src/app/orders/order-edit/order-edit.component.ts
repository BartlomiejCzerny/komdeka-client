import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  orderForm: FormGroup;
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
    this.orderForm = new FormGroup({

      //Karta zamówienia
      idNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      orderNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
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
      admissionOrderDate: new FormControl('', [
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
        Validators.required,
        Validators.requiredTrue
      ]),
      contractorSignature: new FormControl('', [
        Validators.required
      ]),

      //Przegląd zamówienia
      areRequirementsDefined: new FormControl('', [
        Validators.requiredTrue
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
      orderReviewResult: new FormControl(),

      //Wymagania do zamówienia
      orderNum: new FormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      orderRequirements: new FormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      requirementsEstablishedDate: new FormControl('', [
        Validators.required
      ]),
      orderingPersonSignature: new FormControl('', [
        Validators.required
      ]),

      //Karta projektu
      projectCardNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      orderNo: new FormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
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
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
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

      //Przewodnik pracy
      jobGuideNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      releaseDate: new FormControl('', [
        Validators.required
      ]),
      customer: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      productName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      drawingNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      drawingRelease: new FormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      material: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      meltCertificateProof: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      orderNr: new FormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      jobGuideContent: new FormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),

      //Świadectwo jakości
      qualityCertificateNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      orderNbr: new FormControl('', [
        Validators.required,
        Validators.pattern('([1-9]|[1-9][0-9]{1,14})')
      ]),
      purchaser: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      madeProducts: new FormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      remarksAndLimitations: new FormControl('', [
        Validators.maxLength(5000)
      ]),
      position: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      signature: new FormControl('', [
        Validators.required
      ]),
      date: new FormControl('', [
        Validators.required
      ]),

      //Ankieta zadowolenia klienta
      customerComments: new FormControl('', [
        Validators.maxLength(5000)
      ]),
      timeSatisfaction: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-5]{1}')
      ]),
      qualitySatisfaction: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-5]{1}')
      ]),
      clientSignature: new FormControl('', [
        Validators.required
      ]),
      executingPersonSignature: new FormControl('', [
        Validators.required
      ])
    });

    this.getOrderById();
  }

  public hasError(controlName: string, errorName: string) {
    return this.orderForm.controls[controlName].hasError(errorName);
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

  public updateOrder(orderFormValue: any) {
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
