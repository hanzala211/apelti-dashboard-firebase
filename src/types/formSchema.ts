import { z } from "zod"

export const invoiceForm = z.object({
  supplierName: z.string().min(1, "Supplier Name is Required"),
  invoiceNumber: z.string().min(1, "Invoice Number is Required"),
  poNumber: z.string().min(1, "PO no. is Required"),
  termOfPayment: z.string().min(1, "Term of Payment is Required"),
  invoiceDate: z.string().min(1, "Invoice Date is Required"),
  paymentTerm: z.string().min(1, "Payment Term is Required"),
  amount: z.number().min(1, "Amount is Required"),
  invoiceDescription: z.string(),
  rarityInvoice: z.string()
})

export type InvoiceFormSchema = z.infer<typeof invoiceForm>

export const loginForm = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
})

export type LoginFormSchema = z.infer<typeof loginForm>

export const signupForm = z.object({
  firstName: z.string().min(1, "First Name is Required"),
  lastName: z.string().min(1, "Last Name is Required"),
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  companyName: z.string().min(1, "Company Name is Required"),
  numberOfEmployees: z.number().min(1, "Number of Employes is Required"),
  businessType: z.string(),
  phone: z.string().min(1, "Phone Number is Required")
})

export type SignupFormSchema = z.infer<typeof signupForm>