import { useAuth } from '@context';
import { DocumentData } from '@firebaseApp';
import { handleFileChange, toast } from '@helpers';
import { useInvoicesHook } from '@hooks';
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
  const { userData } = useAuth();
  const [selectedImage, setSelectedImage] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [isInvoiceModelOpen, setIsInvoiceModelOpen] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<Invoice | null>(null);
  const [selectedData, setSelectedData] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<Invoice | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
  const { createInvoice, getInvoiceItem, updateInvoiceItem, deleteInvoiceItem } = useInvoicesHook();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formInputRef = useRef<HTMLInputElement>(null);
  const removeDataBtnRef = useRef<HTMLButtonElement>(null);
  const extractDataMutation = useMutation({
    mutationFn: () => extractData(),
  });

  const postInvoiceMutation = useMutation({
    mutationFn: (data: DocumentData) => postInvoice(data),
    onSuccess: () => {
      setExtractedData(null);
    },
  });
  const updateInvoiceMutation = useMutation({
    mutationFn: (data: DocumentData) => updateInvoice(data),
    onSuccess: () => {
      setExtractedData(null);
    },
  });
  const deleteInvoiceMutation = useMutation({
    mutationFn: (invoiceId: string) => deleteInvoice(invoiceId),
    onSuccess: () => {
      setIsInvoiceModelOpen(false);
      handleBtnClick();
    },
  });

  useEffect(() => {
    if (selectedImage?.value) {
      extractDataMutation.mutate();
    }
  }, [selectedImage?.value]);

  const handleFile = () => {
    fileInputRef.current?.click();
  };

  const handleFormClick = () => {
    formInputRef.current?.click();
  };

  const handleBtnClick = () => {
    setTimeout(() => {
      extractDataMutation.reset();
      setFormData(null);
      setSelectedImage(null);
      setExtractedData(null);
      setSelectedData(null);
    }, 500);
    removeDataBtnRef.current?.click();
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

  const getInvoices = async (): Promise<Invoice[]> => {
    try {
      const invoiceData: Invoice[] = await new Promise((resolve) => {
        getInvoiceItem((data: DocumentData) => {
          resolve(data as Invoice[]);
        }, userData?.company);
      });
      console.log(invoiceData);
      return invoiceData;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  };

  const updateInvoice = async (data: DocumentData) => {
    try {
      const invoiceId = selectedData?._id || formData?._id || '';
      await updateInvoiceItem(data, invoiceId)
      setFormData({ ...data, _id: invoiceId } as Invoice);
    } catch (error) {
      console.log(error);
    }
  };

  const postInvoice = async (data: DocumentData) => {
    try {
      const response = await createInvoice(data);
      console.log(response);
      if (response) {
        console.log('getting response');
      }
      setFormData({ ...data, _id: response } as Invoice);
      return response;
    } catch (error) {
      console.log(error);
      toast.error(
        'Error',
        typeof error === 'object' ? (error as Error).message : String(error)
      );
    }
  };

  const deleteInvoice = async (invoiceId: string) => {
    try {
      await deleteInvoiceItem(invoiceId)
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
        handleFormClick,
        formInputRef,
        formData,
        setFormData,
        setExtractedData,
        handleBtnClick,
        removeDataBtnRef,
        selectedInvoice,
        setSelectedInvoice,
        selectedData,
        setSelectedData,
        postInvoiceMutation,
        updateInvoiceMutation,
        deleteInvoiceMutation,
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
