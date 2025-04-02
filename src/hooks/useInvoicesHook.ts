import { DocumentData } from '@firebaseApp';
import { addDocument, getRealTimeDataWithFilter } from '@helpers';

export const useInvoicesHook = () => {
  const createInvoice = async (invoiceData: DocumentData) => {
    try {
      const addInvoice = await addDocument('invoices', {
        supplierName: invoiceData.supplierName,
        invoiceNumber: invoiceData.invoiceNumber,
        poNumber: invoiceData.poNumber,
        termsOfPayment: invoiceData.termsOfPayment,
        invoiceDate: invoiceData.invoiceDate,
        paymentTerms: invoiceData.paymentTerms,
        amount: invoiceData.amount,
        paymentTermDescription: invoiceData.paymentTermDescription,
        currency: invoiceData.currency,
        rarityInvoice: invoiceData.rarityInvoice,
        comment: invoiceData.comment,
        fileUrl: invoiceData?.fileUrl || '',
        fiscalNumber: invoiceData.fiscalNumber,
        vatNumber: invoiceData?.vatNumber,
        vendorId: invoiceData.vendorId || invoiceData?.vatNumber,
        items: invoiceData?.items || [],
        invoiceBy: invoiceData.invoiceBy,
        company: invoiceData.company,
        status: "pending"
      });
      console.log(addInvoice);
      return addInvoice.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getInvoice = (
    onUpdate: (data: DocumentData) => void,
    companyId: string
  ) => {
    const unsubscribe = getRealTimeDataWithFilter(
      'invoices',
      onUpdate,
      'company',
      '==',
      companyId
    );
    return unsubscribe
  };



  return { createInvoice, getInvoice };
};
