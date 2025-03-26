import { z } from 'zod';
export const RoleEnum = z.enum([
  'admin',
  'clerk',
  'payer',
  'accountant',
  'approver',
]);

export const invoiceItemSchema = z.object({
  glAccount: z.string().min(1, 'Account number is Required'),
  amount: z.number().min(1, 'Amount is Required'),
  description: z.string().min(1, 'Description is Required'),
  class: z.string().min(1, 'Class is Required'),
  department: z.string().min(1, 'Department is Required'),
});

export const invoiceForm = z.object({
  supplierName: z.string().min(1, 'Vendor Name is Required'),
  invoiceNumber: z.string().min(1, 'Invoice Number is Required'),
  poNumber: z.string().min(1, 'PO no. is Required'),
  termsOfPayment: z.string().min(1, 'Term of Payment is Required'),
  invoiceDate: z.string().min(1, 'Invoice Date is Required'),
  paymentTerms: z.string().min(1, 'Payment Term is Required'),
  amount: z.number().min(1, 'Amount is Required'),
  paymentTermDescription: z.string(),
  rarityInvoice: z.string(),
  invoiceItems: z.array(invoiceItemSchema),
  currency: z.string(),
  comment: z.string().min(1, 'Comment is Required'),
  supplierId: z.string().min(1, 'Vendor ID is Required'),
  fiscalNumber: z.string().min(1, "Fiscal Number is Required")
});

export type InvoiceFormSchema = z.infer<typeof invoiceForm>;

export const loginForm = z.object({
  email: z.string().email('Invalid Email Address'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export type LoginFormSchema = z.infer<typeof loginForm>;

export const signupForm = z.object({
  firstName: z.string().min(1, 'First Name is Required'),
  lastName: z.string().min(1, 'Last Name is Required'),
  email: z.string().email('Invalid Email Address'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  companyName: z.string().min(1, 'Company Name is Required'),
  numberOfEmployees: z.number().min(1, 'Number of Employes is Required'),
  businessType: z.string(),
  phone: z.string().min(1, 'Phone Number is Required'),
});
export type SignupFormSchema = z.infer<typeof signupForm>;

export const addMemberForm = signupForm
  .pick({ firstName: true, lastName: true, email: true, phone: true })
  .extend({
    role: RoleEnum,
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .optional(),
  });

export type AddMemberFormSchema = z.infer<typeof addMemberForm>;

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email').optional(),
  oldPassword: z
    .string()
    .min(6, 'Old password must be at least 6 characters')
    .optional(),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters')
    .optional(),
  role: z.string().min(1, 'Please select a role').optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
