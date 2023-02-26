import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { OrderService } from './../../shared/services/order.service';
import { Order } from './../../interfaces/order/order.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  private getOrderById() {
    let orderId = this.activeRoute.snapshot.params['id'];
    let orderByIdUrl = `api/orders/${orderId}`;
    this.orderService.getOrder(orderByIdUrl)
      .subscribe(res => {
        this.order = res as Order;
        this.orderForm.patchValue(this.order);
      }
      );
  }

  redirectToOrdersList() {
    this.router.navigate(['/orders/orders-list']);
  }
}
