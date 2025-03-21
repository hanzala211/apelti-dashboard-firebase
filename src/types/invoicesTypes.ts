export interface InvoiceItem {
  description: string;
  unitCost: string;
  quantity: string;
  total: string;
  discount?: string;
  taxRate?: string;
  taxAmount?: string;
  _id: string;
}

export interface Invoice {
  businessName: string;
  businessAddress: string;
  businessContact: string;
  businessTaxId: string;
  businessBankDetails: string;
  clientName: string;
  clientAddress?: string;
  clientContact?: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  paymentTerms: string;
  vatNumber?: string;
  items: InvoiceItem[];
  subtotal: string;
  discount?: string;
  tax: string;
  total: string;
  company: string;
  status: string;
  approvedBy?: string | null;
  uploadedBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FilterTypes {
  id: number;
  field: string;
  value: string;
  condition: string;
}
