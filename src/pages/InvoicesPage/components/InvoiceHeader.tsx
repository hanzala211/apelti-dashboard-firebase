import React from 'react';

interface InvoiceHeaderProps {
  extractDataMutation: {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean
  };
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ extractDataMutation }) => {
  const message = extractDataMutation.isPending
    ? 'Loading Invoice'
    : extractDataMutation.isSuccess
      ? 'The Apelti AI has filled in the data from the invoice. Review and add the invoice.' :
      extractDataMutation.isError ? "" : 'Enter Invoice Data Manually'

  return (
    <div className="w-full border-b-[1px] py-14 px-7">
      <div className="w-full border-[1px] rounded-md border-basicBlack p-5 flex justify-center items-center">
        <h1
          className={`text-[22px] ${extractDataMutation.isPending || extractDataMutation.isSuccess ? 'text-basicGreen' : ''
            } m-0 text-center font-semibold`}
        >
          {message}
        </h1>
      </div>
    </div>
  );
};

export default InvoiceHeader;
