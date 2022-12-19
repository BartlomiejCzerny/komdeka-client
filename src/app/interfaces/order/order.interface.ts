export interface Order {
  //Karta zamówienia
  idNumber: string;
  orderNumber: number;
  customerName: string;
  street: string;
  buildingNumber: string;
  zipCode: string;
  place: string;
  customerFirstName: string;
  customerLastName: string;
  admissionOrderDate: Date;
  orderDescription: string;
  orderComments: string;
  customerSignature: string;
  contractorSignature: string;

  //Przegląd zamówienia
  areRequirementsDefined: string;
  areDocumentsUpToDate: string;
  areQualityApprovalsUpToDate: string;
  haveSuppliersApprovals: string;
  haveProductionAndEquipmentProcedures: string;
  haveControlProcedures: string;
  haveTheResources: string;
  haveEmployeesAndSkills: string;
  areFirstPieceRequirementsDefined: string;
  haveWarehousesAndResources: string;
  hasRiskAssessed: string;
  isPriceCorrect: string;
  areDeliveryTermsChecked: string;

  //Wymagania do zamówienia
  orderNum: number;
  orderRequirements: string;
  requirementsEstablishedDate: Date;
  orderingPersonSignature: string;

  //Karta projektu
  projectCardNumber: string;
  orderNo: number;
  orderingPersonName: string;
  projectTeam: string;
  documentName: string;
  documentNumber: number;
  comments: string;
  reviewResult: string;
  identifiedProblems: string;
  plannedActivities: string;
  verificationResult: string;
  encounteredProblems: string;
  plannedWorks: string;
  validationResult: string;
  problems: string;
  activities: string;
  descriptionOfChange: string;
  shiftCardNumber: string;
  docName: string;
  documentOrDrawingNumber: string;
  remarks: string;
  additionalInformation: string;
  additionalComments: string;
  projectApproval: string;
  designTeamSignatures: string;

  //Przewodnik pracy
  jobGuideNumber: string;
  releaseDate: Date;
  customer: string;
  productName: string;
  drawingNumber: string;
  drawingRelease: number;
  material: string;
  meltCertificateProof: string;
  orderNr: number;
  quantity: number;
  jobGuideContent: string;

  //Świadectwo jakości
  qualityCertificateNumber: string;
  purchaser: string;
  orderNbr: number;
  madeProducts: string;
  remarksAndLimitations: string;
  position: string;
  firstName: string;
  lastName: string;
  signature: string;
  date: Date;

  //Ankieta zadowolenia klienta
  customerComments: string;
  timeSatisfaction: number;
  qualitySatisfaction: number;
  clientSignature: string;
  executingPersonSignature: string;
}
