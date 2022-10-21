export interface Tool {
  idNumber: string;
  name: string;
  type: string;
  serialNumber: string;
  isMetrologicalService?: boolean;
  // periodValidity: Date;
  metrologicalServiceInterval?: string;
  lastMetrologicalService?: Date;
  validUntil?: Date;
  status: string;
}
