import React from 'react';
import { Control, FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { DatePickerField, Input, Select } from '@components';
import { InvoiceFormSchema } from '@types';

interface InvoiceFormContentProps {
  register: UseFormRegister<InvoiceFormSchema>;
  errors: FieldErrors<InvoiceFormSchema>;
  control: Control<InvoiceFormSchema>;
  handleSubmit: UseFormHandleSubmit<InvoiceFormSchema>;
  onSubmit: SubmitHandler<InvoiceFormSchema>;
  rows: number;
  addRow: () => void;
  termOfPaymentData: { label: string; value: string }[];
}

export const InvoiceFormContent: React.FC<InvoiceFormContentProps> = ({
  register,
  errors,
  control,
  handleSubmit,
  onSubmit,
  rows,
  addRow,
  termOfPaymentData,
}) => {
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full px-7">
        <Input register={register('supplierName')} type="text" label="Name of Supplier" />
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
        <Select
          control={control}
          name="termOfPayment"
          label="Terms of Payment"
          data={termOfPaymentData}
        />
        <div className="flex flex-col gap-2 w-full">
          <label className="text-neutralGray" htmlFor="invoiceDate">
            Invoice date
          </label>
          <DatePickerField control={control} name='invoiceDate' />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-neutralGray" htmlFor="paymentTerm">
            Payment term
          </label>
          <DatePickerField control={control} name='paymentTerm' />
        </div>
      </div>
      <div className="grid px-7 lg:grid-cols-[1fr_2fr] grid-cols-1 gap-5">
        <Input
          register={register('amount', { valueAsNumber: true })}
          error={errors['amount']?.message}
          type="string"
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
            <input type="radio" id="once" value="Once" {...register('rarityInvoice')} />
            <label htmlFor="once" className="text-neutralGray">
              Once
            </label>
          </div>
          <div className="space-x-2">
            <input type="radio" id="return" value="Return" {...register('rarityInvoice')} />
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
          {['Account', 'Amount', 'Department', 'Class', 'Description'].map((header) => (
            <h4 key={header} className="m-0 py-3 text-center font-medium">
              {header}
            </h4>
          ))}
        </div>
        {[...Array(rows)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 min-w-[600px] w-full border-b py-4 px-5 sm:px-2 gap-4 place-items-center"
          >
            <Input register={register(`invoiceItems.${index}.description`)} type="text" />
            <Input register={register(`invoiceItems.${index}.total`)} type="text" />
            <Input register={register(`invoiceItems.${index}.unitCost`)} type="text" />
            <Input register={register(`invoiceItems.${index}.quantity`)} type="text" />
            <Input register={register(`invoiceItems.${index}.taxAmount`)} type="text" />
          </div>
        ))}
      </div>
      <div className="w-full px-7 pb-5 pt-2 flex items-center border-b-[1px]">
        <button type="button" onClick={addRow} className="m-0 hover:opacity-60">
          Add Row
        </button>
      </div>
    </form>
  );
};

export default InvoiceFormContent;
