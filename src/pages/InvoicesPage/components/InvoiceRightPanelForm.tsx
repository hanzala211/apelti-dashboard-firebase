import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { invoiceForm, InvoiceFormSchema } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from '@helpers';
import { useInvoice } from '@context';
import InvoiceHeader from './InvoiceHeader';
import ImageUpload from './ImageUpload';
import InvoiceFormContent from './InvoiceFormContent';

export const InvoiceRightPanelForm: React.FC = () => {
  const {
    selectedImage,
    handleChange,
    handleFile,
    setSelectedImage,
    fileInputRef,
    extractDataMutation,
    extractedData,
  } = useInvoice();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<InvoiceFormSchema>({
    resolver: zodResolver(invoiceForm),
    defaultValues: {
      rarityInvoice: 'Once',
    },
  });
  const [rows, setRows] = useState<number>(extractedData?.items?.length || 1);

  useEffect(() => {
    if (extractedData !== null) {
      setValue('supplierName', extractedData.businessName);
      setValue('invoiceNumber', extractedData.invoiceNumber);
      if (extractedData.paymentTerms.length > 0) {
        setValue('paymentTerm', formatDate(extractedData.dueDate));
      }
      setValue('amount', extractedData.total);
      if (extractedData.date.length > 0) {
        setValue('invoiceDate', formatDate(extractedData.date));
      }
      if (extractedData.items) {
        setValue(
          'invoiceItems',
          extractedData.items.map((item) => ({
            description: item.description || '',
            unitCost: item.unitCost || '',
            quantity: item.quantity || '',
            total: item.total || '',
            discount: item.discount || '',
            taxRate: item.taxRate || '',
            taxAmount: item.taxAmount || '',
            _id: item._id || '',
          }))
        );
      }
    }
  }, [extractedData, setValue]);

  console.log(extractDataMutation)

  const onSubmit: SubmitHandler<InvoiceFormSchema> = (data) => {
    console.log(data);
  };

  const addRow = () => {
    setRows((prevRows) => prevRows + 1);
  };

  const termOfPaymentData = [
    { label: 'NET 30', value: 'net-30' },
    { label: 'NET 50', value: 'net-50' },
  ];

  return (
    <section className="bg-basicWhite mt-[1px] w-full h-full max-h-[calc(100dvh-6rem)] overflow-y-auto">
      <InvoiceHeader extractDataMutation={extractDataMutation} />
      <ImageUpload
        selectedImage={selectedImage}
        handleFile={handleFile}
        fileInputRef={fileInputRef}
        handleChange={handleChange}
        setSelectedImage={setSelectedImage}
      />
      <div className="py-5">
        <InvoiceFormContent
          register={register}
          errors={errors}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          rows={rows}
          addRow={addRow}
          termOfPaymentData={termOfPaymentData}
        />
      </div>
    </section>
  );
};

export default InvoiceRightPanelForm;
