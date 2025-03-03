export interface InvoiceItem {
  invoiceNumber: string;
  uploads: string;
  supplier: string;
  poNumber: string;
  accountPlan: string;
  dateOfCreation: string;
  invoiceDate: string;
  paymentTerm: string;
  amount: string;
  status: string;
}

export interface FilterTypes {
  id: number,
  field: string,
  value: string,
  condition: string
}