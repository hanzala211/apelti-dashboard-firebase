import { invoiceForm, InvoiceFormSchema } from "@types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select } from "@components";
import { useInvoice } from "@context";
import { ReactSVG } from "react-svg";
import { iconsPath } from "@constants";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export const InvoiceRightPanelForm: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<InvoiceFormSchema>({
    resolver: zodResolver(invoiceForm),
    defaultValues: {
      rarityInvoice: "Once"
    }
  });
  const { selectedImage, handleChange, handleFile, setSelectedImage, fileInputRef } = useInvoice();

  const onSubmit: SubmitHandler<InvoiceFormSchema> = (data) => {
    console.log(data);
  }

  const termOfPaymentData = [
    { label: "NET 30", value: "net-30" },
    { label: "NET 50", value: "net-50" },
  ]

  return (
    <section className="bg-basicWhite mt-[1px] w-full h-full max-h-[calc(100dvh-6rem)] overflow-y-auto">
      <div className="w-full border-b-[1px] py-14 px-7">
        <div className="w-full border-[1px] rounded-md border-basicBlack p-5 flex justify-center">
          <h1 className="text-[22px] text-center font-semibold">Enter Invoice Data Manually</h1>
        </div>
      </div>

      <div className="md:hidden">
        {selectedImage === null ? (
          <div className="py-10 w-full border-b-[1px] flex justify-center">
            <button
              onClick={handleFile}
              className="text-darkBlue font-semibold before:w-36 before:-translate-x-1/2 before:left-1/2 before:absolute relative before:h-1 before:bg-darkBlue before:bottom-0"
            >
              Browse Folders
            </button>
            <input ref={fileInputRef} onChange={handleChange} type="file" className="hidden" />
          </div>
        ) : (
          <div className="relative w-full border-b-[1px] flex justify-center">
            <button className="absolute right-2 top-2" onClick={() => setSelectedImage(null)}>
              <ReactSVG src={iconsPath.close} />
            </button>
            <img src={selectedImage.value} alt={`${selectedImage.label} Image`} className="w-52 object-contain" />
          </div>
        )}
      </div>

      <div className="px-7 py-5">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <Input register={register("supplierName")} type="text" label="Name of Supplier" />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <Input register={register("invoiceNumber")} type="text" error={errors["invoiceNumber"]?.message} label="Invoice number" />
            <Input register={register("poNumber")} error={errors["poNumber"]?.message} type="text" label="PO no." />
          </div>
          <div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-10 gap-4 w-full">
            <Select<InvoiceFormSchema> control={control} name="termOfPayment" label="Terms of Payment" data={termOfPaymentData} />
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
                      className="bg-white w-full py-[9px] px-3 focus-within:outline-none border-basicBlack border-[1px]"
                      onChange={(_, dateString) => field.onChange(dateString)}
                      value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                    />
                    {error && <p className="text-basicRed text-sm">{error.message}</p>}
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
                      className="bg-white w-full py-[9px] px-3 focus-within:outline-none border-basicBlack border-[1px]"
                      onChange={(_, dateString) => field.onChange(dateString)}
                      value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                    />
                    {error && <p className="text-basicRed text-sm">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-[1fr_2fr] grid-cols-1 gap-5">
            <Input register={register("amount", { valueAsNumber: true })} error={errors["amount"]?.message} type="number" label="Amount" />
            <Input register={register("invoiceDescription")} error={errors["invoiceDescription"]?.message} type="text" label="Invoice Description" />
          </div>

          <label className="text-neutralGray" htmlFor="rarityInvoice">
            Rarity Invoice
          </label>
          <div className="flex gap-3 items-center">
            <div className="space-x-2">
              <input type="radio" id="once" value="Once" {...register("rarityInvoice")} />
              <label htmlFor="once" className="text-neutralGray">
                Once
              </label>
            </div>
            <div className="space-x-2">
              <input type="radio" id="return" value="Return" {...register("rarityInvoice")} />
              <label htmlFor="return" className="text-neutralGray">
                Return
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InvoiceRightPanelForm;
