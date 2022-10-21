export interface Order {
  orderNumber: number;
  customerName: string;
  street: string;
  buildingNumber: string;
  zipCode: string;
  place: string;
  firstName: string;
  lastName: string;
  date: Date;
  orderDescription: string;
  orderComments: string;
  customerSignature: boolean;
  contractorSignature: boolean;
}
