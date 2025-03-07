import { IMessage, IUser } from "@types";
import { RefObject } from "react";

export interface MessageContextTypes {
  selectedMessage: IMessage | null,
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessage | null>>
}

export interface InvoiceContextTypes {
  selectedImage: { label: string, value: string } | null,
  setSelectedImage: React.Dispatch<React.SetStateAction<{ label: string, value: string } | null>>,
  handleFile: () => void,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  fileInputRef: RefObject<HTMLInputElement | null>,
  isInvoiceModelOpen: boolean,
  setIsInvoiceModelOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface AuthContextTypes {
  userData: IUser | null,
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>,
  isRemember: boolean,
  setIsRemember: React.Dispatch<React.SetStateAction<boolean>>,
  signup: (sendData: unknown) => void,
  login: (sendData: unknown) => void,
  isMainLoading: boolean,
  setIsMainLoading: React.Dispatch<React.SetStateAction<boolean>>,
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  isAuthLoading: boolean
}

export interface TeamContextTypes {
  teamMembers: IUser[],
  setTeamMembers: React.Dispatch<React.SetStateAction<IUser[]>>,
  addMember: (sendData: unknown) => void,
  isAddingMember: boolean,
  isTeamLoading: boolean,
  deleteMember: (userId: string) => void,
  editingUser: IUser | null,
  setEditingUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  updateUser: (userId: string, data: unknown) => void,
  errorMessage: string,
  getMembers: () => void
}

export interface SettingContextTypes {
  changeEmailAndName: (data: unknown) => void,
  errorMessage: string,
  changeUserData: (data: unknown) => void
}