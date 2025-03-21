import { UseMutationResult } from '@tanstack/react-query';
import { IMessage, Invoice, IUser } from '@types';
import { RefObject } from 'react';
import { Socket } from 'socket.io-client';

export interface MessageContextTypes {
  selectedMessage: IMessage | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessage | null>>;
}

export interface InvoiceContextTypes {
  selectedImage: { label: string; value: string } | null;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<{ label: string; value: string } | null>
  >;
  handleFile: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isInvoiceModelOpen: boolean;
  setIsInvoiceModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  extractDataMutation: UseMutationResult<void, Error, void, unknown>,
  extractedData: Invoice | null
}

export interface AuthContextTypes {
  userData: IUser | null;
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
  isRemember: boolean;
  setIsRemember: React.Dispatch<React.SetStateAction<boolean>>;
  signup: (sendData: unknown) => void;
  login: (sendData: unknown) => void;
  isMainLoading: boolean;
  setIsMainLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isAuthLoading: boolean;
  socketClient: Socket | null;
}

export interface TeamContextTypes {
  addMember: (sendData: unknown) => Promise<IUser | null>;
  deleteMember: (userId: string) => Promise<null | undefined>;
  editingUser: IUser | null;
  setEditingUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  updateUser: (userId: string, data: unknown) => Promise<IUser | null>;
  errorMessage: string;
  getMembers: () => Promise<IUser[] | null>;
}

export interface SettingContextTypes {
  changePassword: (data: unknown) => void;
  errorMessage: string;
  changeUserData: (data: unknown) => void;
}
