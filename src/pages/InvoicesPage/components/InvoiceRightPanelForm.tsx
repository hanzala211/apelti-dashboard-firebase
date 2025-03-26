import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { invoiceForm, InvoiceFormSchema } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from '@helpers';
import { useInvoice } from '@context';
import InvoiceHeader from './InvoiceHeader';
import ImageUpload from './ImageUpload';
import InvoiceFormContent from './InvoiceFormContent';
import { CURRENCIES, TERM_OF_PAYMENT } from '@constants';
import InvoiceRightPanelOverview from './InvoiceRightPanelOverview';

export const InvoiceRightPanelForm: React.FC = () => {
  const {
    selectedImage,
    handleChange,
    handleFile,
    setSelectedImage,
    fileInputRef,
    extractDataMutation,
    extractedData,
    setFormData,
    formData,
    removeDataBtnRef,
  } = useInvoice();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<InvoiceFormSchema>({
    resolver: zodResolver(invoiceForm),
    defaultValues: {
      rarityInvoice: 'Once',
      currency: CURRENCIES[0].value,
      termsOfPayment: TERM_OF_PAYMENT[0].value,
    },
  });
  const [rows, setRows] = useState<number>(extractedData?.items?.length || 1);

  useEffect(() => {
    if (extractedData !== null) {
      setValue('supplierName', extractedData.supplierName);
      setValue('invoiceNumber', extractedData.invoiceNumber);
      setValue('poNumber', extractedData.poNumber);
      setValue('currency', extractedData.currency);
      setValue("supplierId", extractedData.vendorId)
      setValue("fiscalNumber", extractedData.FiscalNumber)
      if (extractedData.paymentTerms.length > 0) {
        setValue('paymentTerms', formatDate(extractedData.paymentTerms));
      }
      setValue('amount', extractedData.amount);
      if (extractedData.invoiceDate.length > 0) {
        setValue('invoiceDate', formatDate(extractedData.invoiceDate));
      }
      if (extractedData.items) {
        setValue(
          'invoiceItems',
          extractedData.items.map((item) => ({
            description: item.description || '',
            glAccount: item.glAccount || '',
            amount: item.amount || 0,
            class: item.class || '',
            department: item.department || '',
          }))
        );
        setRows(extractedData?.items?.length);
      }
    }
  }, [extractedData, setValue]);

  const onSubmit: SubmitHandler<InvoiceFormSchema> = (data) => {
    console.log(data);
    setFormData({
      supplierName: data.supplierName,
      invoiceNumber: data.invoiceNumber,
      poNumber: data.poNumber,
      termsOfPayment: data.termsOfPayment,
      invoiceDate: data.invoiceDate,
      paymentTerms: data.paymentTerms,
      amount: data.amount,
      paymentTermDescription: data.paymentTermDescription,
      currency: data.currency,
      rarityInvoice: data.rarityInvoice,
      items: data.invoiceItems,
      comment: data.comment,
      fileUrl: extractedData?.fileUrl || '',
      vendorId: data.supplierId,
      FiscalNumber: data.fiscalNumber,
      vatNumber: extractedData?.vatNumber || ""
    });
  };

  const addRow = () => {
    setRows((prevRows) => prevRows + 1);
  };

  return (
    <section className="bg-basicWhite mt-[1px] w-full h-full max-h-[calc(100dvh-6rem)] overflow-y-auto">
      {!formData ? (
        <>
          <button
            ref={removeDataBtnRef}
            onClick={() => {
              reset({
                rarityInvoice: 'Once',
                currency: CURRENCIES[0].value,
                termsOfPayment: TERM_OF_PAYMENT[0].value,
                supplierName: '',
                invoiceNumber: '',
                poNumber: '',
                paymentTerms: '',
                amount: 0,
                invoiceDate: '',
                paymentTermDescription: '',
                comment: '',
                invoiceItems: [],
              });
              setRows(1);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            className="hidden"
          ></button>
          <InvoiceHeader extractDataMutation={extractDataMutation} />
          <ImageUpload
            selectedImage={selectedImage}
            handleFile={handleFile}
            fileInputRef={fileInputRef}
            handleChange={handleChange}
            setSelectedImage={setSelectedImage}
          />
          <div className="pt-5">
            <InvoiceFormContent
              register={register}
              watch={watch}
              errors={errors}
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              rows={rows}
              addRow={addRow}
              termOfPaymentData={TERM_OF_PAYMENT}
            />
          </div>
        </>
      ) : (
        <InvoiceRightPanelOverview />
      )}
    </section>
  );
};

export default InvoiceRightPanelForm;
