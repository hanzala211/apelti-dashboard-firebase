import { COLORS, ICONS } from '@constants';
import { useInvoice } from '@context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SyncLoader } from 'react-spinners';
import { ReactSVG } from 'react-svg';

export const InvoiceModelHeader: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    setIsInvoiceModelOpen,
    handleFormClick,
    setFormData,
    setSelectedImage,
    setExtractedData,
    handleBtnClick,
    formData,
    postInvoice,
  } = useInvoice();
  const postInvoiceMutation = useMutation({
    mutationFn: postInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      handleClose()
    },
  });

  const handleClose = () => {
    handleBtnClick();
    setIsInvoiceModelOpen(false);
    setTimeout(() => {
      setFormData(null);
      setSelectedImage(null);
      setExtractedData(null);
    }, 500);
  };

  return (
    <header className="h-[7rem] px-4 shadow-lg flex justify-between items-center w-full bg-basicWhite">
      <h1 className="md:text-[22px] text-[17px] font-bold">Add Invoice</h1>
      <div className="flex gap-4 items-center">
        <button
          className={`text-basicWhite md:text-[16px] text-[14px] bg-primaryColor px-7 hover:bg-opacity-70 transition-all border-primaryColor border-[1px] duration-200 py-1.5 rounded-full ${postInvoiceMutation.isPending && 'bg-blue-700 cursor-not-allowed'
            }`}
          disabled={postInvoiceMutation.isPending}
          onClick={() => {
            if (!formData) {
              handleFormClick();
            } else {
              postInvoiceMutation.mutate();
            }
          }}
        >
          {!postInvoiceMutation.isPending ? (
            'Add'
          ) : (
            <div>
              <SyncLoader color={COLORS.temporaryGray} size={10} />
            </div>
          )}
        </button>
        <button
          onClick={() => {
            if (formData) {
              setFormData(null);
            }
          }}
          className="text-basicBlack md:text-[16px] text-[14px] bg-basicWhite hover:bg-gray-200 transition-all duration-200 border-basicBlack border-[1px] px-7 py-1.5 rounded-full"
        >
          {!formData ? 'Draft' : 'Edit'}
        </button>
        <button onClick={handleClose}>
          <ReactSVG src={ICONS.close} />
        </button>
      </div>
    </header>
  );
};

export default InvoiceModelHeader;
