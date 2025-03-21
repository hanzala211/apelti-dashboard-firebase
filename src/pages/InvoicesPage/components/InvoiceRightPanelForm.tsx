import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { invoiceForm, InvoiceFormSchema } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select } from '@components';
import { ICONS } from '@constants';
import { useInvoice } from '@context';
import { ReactSVG } from 'react-svg';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

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
      setValue('paymentTerm', extractedData.paymentTerms);
      setValue('amount', extractedData.total);

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
      <div className="w-full border-b-[1px] py-14 px-7">
        <div className="w-full border-[1px] rounded-md border-basicBlack p-5 flex justify-center items-center">
          <h1
            className={`text-[22px] ${extractDataMutation.isPending || extractDataMutation.isSuccess
                ? 'text-basicGreen'
                : ''
              } m-0 text-center font-semibold`}
          >
            {extractDataMutation.isPending
              ? 'Loading Invoice'
              : !extractDataMutation.isSuccess
                ? 'Enter Invoice Data Manually'
                : 'The Applet AI has filled in the data from the invoice. Review and add the invoice.'}
          </h1>
        </div>
      </div>

      <div className="md:hidden">
        {selectedImage === null ? (
          <div className="py-10 w-full border-b-[1px] flex justify-center">
            <button
              onClick={handleFile}
              className="text-darkBlue font-semibold before:w-36 before:-translate-x-1/2 before:left-1/2 before:absolute relative before:h-1 before:bg-darkBlue before:-bottom-2"
            >
              Browse Folders
            </button>
            <input
              ref={fileInputRef}
              onChange={handleChange}
              type="file"
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative w-full border-b-[1px] flex justify-center">
            <button
              className="absolute right-2 top-2"
              onClick={() => setSelectedImage(null)}
            >
              <ReactSVG src={ICONS.close} />
            </button>
            <img
              src={selectedImage.value}
              alt={`${selectedImage.label} Image`}
              className="w-52 object-contain"
            />
          </div>
        )}
      </div>

      <div className="py-5">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full px-7">
            <Input
              register={register('supplierName')}
              type="text"
              label="Name of Supplier"
            />
          </div>
          <div className="grid px-7 md:grid-cols-2 grid-cols-1 gap-5">
            <Input
              register={register('invoiceNumber')}
              type="text"
              error={errors['invoiceNumber']?.message}
              label="Invoice number"
            />
            <Input
              register={register('poNumber')}
              error={errors['poNumber']?.message}
              type="text"
              label="PO no."
            />
          </div>
          <div className="grid px-7 xl:grid-cols-3 grid-cols-1 xl:gap-10 gap-4 w-full">
            <Select<InvoiceFormSchema>
              control={control}
              name="termOfPayment"
              label="Terms of Payment"
              data={termOfPaymentData}
            />
            <div className="flex flex-col gap-2 w-full">
              <label className="text-neutralGray" htmlFor="invoiceDate">
                Invoice date
              </label>
              <Controller
                control={control}
                name="invoiceDate"
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      id="invoiceDate"
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      className="bg-white w-full py-[4px] px-3 focus-within:outline-none border-basicBlack border-[1px]"
                      onChange={(_, dateString) => field.onChange(dateString)}
                      value={
                        field.value ? dayjs(field.value, 'DD/MM/YYYY') : null
                      }
                    />
                    {error && (
                      <p className="text-basicRed text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-neutralGray" htmlFor="paymentTerm">
                Payment term
              </label>
              <Controller
                control={control}
                name="paymentTerm"
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      id="paymentTerm"
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      className="bg-white w-full py-[4px] px-3 focus-within:outline-none border-basicBlack border-[1px]"
                      onChange={(_, dateString) => field.onChange(dateString)}
                      value={
                        field.value ? dayjs(field.value, 'DD/MM/YYYY') : null
                      }
                    />
                    {error && (
                      <p className="text-basicRed text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="grid px-7 lg:grid-cols-[1fr_2fr] grid-cols-1 gap-5">
            <Input
              register={register('amount', { valueAsNumber: true })}
              error={errors['amount']?.message}
              type="number"
              label="Amount"
            />
            <Input
              register={register('invoiceDescription')}
              error={errors['invoiceDescription']?.message}
              type="text"
              label="Invoice Description"
            />
          </div>
          <div className="px-7">
            <label className="text-neutralGray" htmlFor="rarityInvoice">
              Rarity Invoice
            </label>
            <div className="flex gap-3 items-center">
              <div className="space-x-2">
                <input
                  type="radio"
                  id="once"
                  value="Once"
                  {...register('rarityInvoice')}
                />
                <label htmlFor="once" className="text-neutralGray">
                  Once
                </label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="return"
                  value="Return"
                  {...register('rarityInvoice')}
                />
                <label htmlFor="return" className="text-neutralGray">
                  Return
                </label>
              </div>
            </div>
          </div>
          <div>
            <div className="w-fit px-7">
              <h2 className="text-[18px] font-semibold before:w-48 before:-translate-x-1/2 before:left-[50%] before:absolute relative before:h-1 before:bg-darkBlue before:-bottom-[9px]">
                Costs (something)
              </h2>
            </div>
            <div className="w-full h-[1px] bg-black"></div>
          </div>
          <div className="w-full overflow-x-auto px-4 sm:px-0">
            <div className="grid grid-cols-5 min-w-[600px] w-full px-5 sm:px-2 gap-4 place-items-center border border-slateGrey">
              {['Account', 'Amount', 'Department', 'Class', 'Description'].map(
                (header) => (
                  <h4 key={header} className="m-0 py-3 text-center font-medium">
                    {header}
                  </h4>
                )
              )}
            </div>
            {[...Array(rows)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-5 min-w-[600px] w-full border-b py-4 px-5 sm:px-2 gap-4 place-items-center"
              >
                <Input
                  register={register(`invoiceItems.${index}.description`)}
                  type="text"
                />
                <Input
                  register={register(`invoiceItems.${index}.total`)}
                  type="text"
                />
                <Input
                  register={register(`invoiceItems.${index}.unitCost`)}
                  type="text"
                />
                <Input
                  register={register(`invoiceItems.${index}.quantity`)}
                  type="text"
                />
                <Input
                  register={register(`invoiceItems.${index}.taxAmount`)}
                  type="text"
                />
              </div>
            ))}
          </div>
          <div className="w-full px-7 pb-5 pt-2 flex items-center border-b-[1px]">
            <button
              type="button"
              onClick={addRow}
              className="m-0 hover:opacity-60"
            >
              Add Row
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InvoiceRightPanelForm;
