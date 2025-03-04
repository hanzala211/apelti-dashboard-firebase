import { handleFileChange } from "@helpers";
import { InvoiceContextTypes } from "@types";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

const InvoiceContext = createContext<InvoiceContextTypes | undefined>(undefined)

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<{ label: string, value: string } | null>(null)
  const [isInvoiceModelOpen, setIsInvoiceModelOpen] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const foundValue = handleFileChange(event)
    if (foundValue !== undefined)
      setSelectedImage(foundValue);
  }
  return <InvoiceContext.Provider value={{ selectedImage, setSelectedImage, handleFile, handleChange, fileInputRef, isInvoiceModelOpen, setIsInvoiceModelOpen }}>{children}</InvoiceContext.Provider>
}

export const useInvoice = (): InvoiceContextTypes => {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error("use useInvoice inside Invoice Provider")
  }
  return context
}