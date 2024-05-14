import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../../shared/services/order.service';
import { Order } from './../../interfaces/order/order.interface';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderForm: UntypedFormGroup;
  order: Order;

  orderNumber: number;

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

  showError: boolean;
  errorMessage: string;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
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
        Validators.required,
        Validators.requiredTrue
      ]),
      contractorSignature: new UntypedFormControl('', [
        Validators.required
      ]),

      //Przegląd zamówienia
      areRequirementsDefined: new UntypedFormControl('', [
        Validators.requiredTrue
      ]),
      areDocumentsUpToDate: new UntypedFormControl('', [
        Validators.required
      ]),
      areQualityApprovalsUpToDate: new UntypedFormControl('', [
        Validators.required
      ]),
      haveSuppliersApprovals: new UntypedFormControl('', [
        Validators.required
      ]),
      haveProductionAndEquipmentProcedures: new UntypedFormControl('', [
        Validators.required
      ]),
      haveControlProcedures: new UntypedFormControl('', [
        Validators.required
      ]),
      haveTheResources: new UntypedFormControl('', [
        Validators.required
      ]),
      haveEmployeesAndSkills: new UntypedFormControl('', [
        Validators.required
      ]),
      areFirstPieceRequirementsDefined: new UntypedFormControl('', [
        Validators.required
      ]),
      haveWarehousesAndResources: new UntypedFormControl('', [
        Validators.required
      ]),
      hasRiskAssessed: new UntypedFormControl('', [
        Validators.required
      ]),
      isPriceCorrect: new UntypedFormControl('', [
        Validators.required
      ]),
      areDeliveryTermsChecked: new UntypedFormControl('', [
        Validators.required
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
        Validators.required
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
        Validators.required
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
        Validators.required
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
        Validators.required
      ]),
      executingPersonSignature: new UntypedFormControl('', [
        Validators.required
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
          this.showError = true;
          this.errorMessage = error;
        })
      );
  }

  redirectToOrdersList() {
    this.router.navigate(['/orders/orders-list']);
  }
}
