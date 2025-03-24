import { handleFileChange } from '@helpers';
import { invoiceServices } from '@services';
import { useMutation } from '@tanstack/react-query';
import { Invoice, InvoiceContextTypes } from '@types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const InvoiceContext = createContext<InvoiceContextTypes | undefined>(
  undefined
);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [isInvoiceModelOpen, setIsInvoiceModelOpen] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<Invoice | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extractDataMutation = useMutation({
    mutationFn: () => extractData(),
  });

  useEffect(() => {
    if (selectedImage?.value) {
      console.log('extracting');
      extractDataMutation.mutate();
    }
  }, [selectedImage?.value]);

  const handleFile = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const foundValue = handleFileChange(event);
    if (foundValue !== undefined) setSelectedImage(foundValue);
  };

  const extractData = async () => {
    try {
      if (!selectedImage?.value) return;
      const formData = new FormData();

      const response = await fetch(selectedImage.value);
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      const fileName = selectedImage?.label || 'uploaded_file';
      formData.append('file', blob, fileName);
      const extractedData = await invoiceServices.extractData(formData);
      console.log('Extracted Data:', extractedData);
      setExtractedData(extractedData.data.data);
    } catch (error) {
      console.error('Error extracting data:', error);
    }
  };

  const getInvoices = async () => {
    try {
      const response = await invoiceServices.getInvoices();
      console.log(response)
      if (response.status === 200) {
        return response.data.data;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        handleFile,
        handleChange,
        fileInputRef,
        isInvoiceModelOpen,
        setIsInvoiceModelOpen,
        extractDataMutation,
        extractedData,
        getInvoices,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextTypes => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('use useInvoice inside Invoice Provider');
  }
  return context;
};
