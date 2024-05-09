export interface Order {
  //Karta zamówienia
  idNumber?: string;
  orderNumber?: number;
  customerName?: string;
  street?: string;
  buildingNumber?: string;
  zipCode?: string;
  place?: string;
  customerFirstName?: string;
  customerLastName?: string;
  admissionOrderDate?: Date;
  orderDescription?: string;
  orderComments?: string;
  customerSignature?: boolean;
  contractorSignature?: boolean;
  signatureStatus?: string;

  //Przegląd zamówienia
  areRequirementsDefined?: boolean;
  areDocumentsUpToDate?: boolean;
  areQualityApprovalsUpToDate?: boolean;
  haveSuppliersApprovals?: boolean;
  haveProductionAndEquipmentProcedures?: boolean;
  haveControlProcedures?: boolean;
  haveTheResources?: boolean;
  haveEmployeesAndSkills?: boolean;
  areFirstPieceRequirementsDefined?: boolean;
  haveWarehousesAndResources?: boolean;
  hasRiskAssessed?: boolean;
  isPriceCorrect?: boolean;
  areDeliveryTermsChecked?: boolean;
  orderReviewOption?: string;
  orderReviewResult?: boolean;

  //Wymagania do zamówienia
  orderNum?: number;
  orderRequirements?: string;
  requirementsEstablishedDate?: Date;
  orderingPersonSignature?: boolean;

  //Karta projektu
  projectCardNumber?: string;
  orderNo?: number;
  orderingPersonName?: string;
  projectTeam?: string;
  documentName?: string;
  documentNumber?: string;
  comments?: string;
  reviewResult?: string;
  identifiedProblems?: string;
  plannedActivities?: string;
  verificationResult?: string;
  encounteredProblems?: string;
  plannedWorks?: string;
  validationResult?: string;
  problems?: string;
  activities?: string;
  descriptionOfChange?: string;
  shiftCardNumber?: string;
  docName?: string;
  documentOrDrawingNumber?: string;
  remarks?: string;
  additionalInformation?: string;
  additionalComments?: string;
  projectApproval?: string;
  designTeamSignatures?: boolean;

  //Przewodnik pracy
  jobGuideNumber?: string;
  releaseDate?: Date;
  customer?: string;
  productName?: string;
  drawingNumber?: string;
  drawingRelease?: number;
  material?: string;
  meltCertificateProof?: string;
  orderNr?: number;
  quantity?: number;
  jobGuideContent?: string;

  //Świadectwo jakości
  qualityCertificateNumber?: string;
  orderNbr?: number;
  purchaser?: string;
  madeProducts?: string;
  remarksAndLimitations?: string;
  position?: string;
  firstName?: string;
  lastName?: string;
  signature?: boolean;
  date?: Date;

  //Ankieta zadowolenia klienta
  customerComments?: string;
  timeSatisfaction?: number;
  qualitySatisfaction?: number;
  clientSignature?: boolean;
  executingPersonSignature?: boolean;
}
