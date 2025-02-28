import { IMessage } from "@types";
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