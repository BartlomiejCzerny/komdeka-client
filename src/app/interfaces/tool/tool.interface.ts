export interface Tool {
  idNumber?: string;
  name?: string;
  type?: string;
  serialNumber?: string;
  isMetrologicalService?: boolean;
  isMetrologicalServiceOption?: string;
  metrologicalServiceInterval?: string;
  lastMetrologicalService?: Date;
  validUntil?: Date;
  status?: string;
}
