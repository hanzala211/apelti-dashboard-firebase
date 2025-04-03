import { DocumentReference } from "@firebaseApp";

export type Role = 'admin' | 'clerk' | 'approver' | 'accountant' | 'payer';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  company: DocumentReference;
  forgotPasswordCode?: number | null;
  passwordResetCodeExpiry?: Date | null;
  _id: string;
  _v: number;
  createdAt: string;
  updatedAt: string;
}
