import { useEffect, useState } from 'react';
import { useAuth, useInvoice } from '@context';
import { FilterTypes, Invoice } from '@types';
import {
  APP_ACTIONS,
  DATE_FOMRAT,
  ICONS,
  PERMISSIONS,
  ROUTES,
} from '@constants';
import {
  Button,
  DraggableModal,
  FilterBtn,
  PageHeading,
  Table,
} from '@components';
import InvoiceModel from './components/InvoiceModel';
import InvoiceFilter from './components/InvoiceFilter';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@helpers';

export const InvoicePage: React.FC = () => {
  const { userData } = useAuth();
  const { setIsInvoiceModelOpen, getInvoices } = useInvoice();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [filters, setFilters] = useState<FilterTypes[]>([
    { id: 1, field: '', condition: '', value: '' },
  ]);
  const { data: invoices, isLoading: isInvoiceLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  useEffect(() => {
    if (invoices && !isInvoiceLoading)
      setFilteredInvoices(
        location.search.includes('unpaid')
          ? invoices.filter((item) => item.status === 'rejected')
          : location.search.includes('return')
            ? invoices.filter((item) => item.status === 'return')
            : location.search.includes('draft')
              ? invoices.filter((item) => item.status === 'draft')
              : invoices
      );
  }, [location.search, invoices]);

  const handleClick = () => {
    setIsInvoiceModelOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFilters = () => {
    let filteredValues = invoices;
    if (!filteredValues) return;
    filteredValues = filteredValues.filter((invoice) => {
      for (const filter of filters) {
        if (!filter.field || !filter.condition || !filter.value) continue;

        switch (filter.field) {
          case 'supplierName': {
            if (
              filter.condition === 'contains' &&
              !invoice[filter.field].includes(filter.value)
            )
              return false;
            if (
              filter.condition === 'equals' &&
              invoice[filter.field] !== filter.value
            )
              return false;
            if (
              filter.condition === 'startsWith' &&
              !invoice[filter.field].startsWith(filter.value)
            )
              return false;
            break;
          }

          case 'invoiceDate':
          case 'paymentTerms': {
            const filterDate = filter.value
              ? dayjs(filter.value, DATE_FOMRAT)
              : null;
            const invoiceDate = invoice[filter.field]
              ? dayjs(invoice[filter.field], DATE_FOMRAT)
              : null;

            if (
              filterDate &&
              invoiceDate &&
              filterDate.isValid() &&
              invoiceDate.isValid()
            ) {
              if (
                filter.condition === 'before' &&
                !invoiceDate.isBefore(filterDate)
              )
                return false;
              if (
                filter.condition === 'after' &&
                !invoiceDate.isAfter(filterDate)
              )
                return false;
              if (
                filter.condition === 'on' &&
                !invoiceDate.isSame(filterDate, 'day')
              )
                return false;
            } else {
              return false;
            }
            break;
          }

          case 'invoiceNumber':
          case 'amount': {
            const filterAmount = parseFloat(filter.value);
            const invoiceAmount = parseFloat(invoice[filter.field] as string);

            if (filter.condition === 'equal' && invoiceAmount !== filterAmount)
              return false;
            if (filter.condition === 'greater' && invoiceAmount <= filterAmount)
              return false;
            if (filter.condition === 'lesser' && invoiceAmount >= filterAmount)
              return false;
            break;
          }
          default:
            break;
        }
      }
      return true;
    });

    setFilteredInvoices(filteredValues);
  };

  const headings = [
    'Invoice Number',
    'Supplier',
    'PO no.',
    'Invoice Date',
    'Payment Term',
    'Amount',
    'Status',
  ];

  const keys: (keyof Invoice)[] = [
    'invoiceNumber',
    'supplierName',
    'poNumber',
    'invoiceDate',
    'paymentTerms',
    'amount',
    'status',
  ];

  if (!userPermissions.includes(APP_ACTIONS.invoicePage))
    return <Navigate to={ROUTES.not_available} />;

  const formattedInvoices = filteredInvoices.map((invoice) => ({
    ...invoice,
    invoiceDate:
      invoice.invoiceDate && invoice.invoiceDate.length > 0 ? formatDate(invoice.invoiceDate) : '',
    paymentTerms:
      invoice.paymentTerms && invoice.paymentTerms.length > 0
        ? formatDate(invoice.paymentTerms)
        : '',
  }));

  return (
    <section className="md:py-9 pt-20 w-screen md:max-w-[calc(100vw-256px)]">
      <div className="md:px-14 px-2 flex justify-between items-center">
        <PageHeading label="Invoices" />
        <Button btnText="Add Invoice" handleClick={handleClick} />
      </div>

      <div className="mt-5 md:px-14 px-2 flex md:gap-14 gap-4 w-fit">
        <FilterBtn
          label="All Invoices"
          bool={location.search === '' || location.search.includes('all')}
          onClick={() => navigate('?all=true')}
        />
        <FilterBtn
          label="Unpaid Invoices"
          bool={location.search.includes('unpaid')}
          onClick={() => navigate('?unpaid=true')}
        />
        <FilterBtn
          label="Return Invoices"
          bool={location.search.includes('return')}
          onClick={() => navigate('?return=true')}
        />
        <FilterBtn
          label="Draft Invoices"
          bool={location.search.includes('draft')}
          onClick={() => navigate('?draft=true')}
        />
      </div>

      <div className="flex mt-5 justify-between items-center md:px-14 px-2">
        <div className="flex gap-2 items-center">
          <button
            onClick={showModal}
            className="text-accentBlue rounded-md transition-all duration-200 flex gap-1 hover:bg-softBlue px-2 py-1 items-center md:text-[18px] text-[15px]"
          >
            <ICONS.plusIcon size={24} /> Add Filters
          </button>
        </div>
        <DraggableModal
          okText="Add"
          handleOk={handleFilters}
          heading="In this view show records"
          modalItems={
            <InvoiceFilter filters={filters} setFilters={setFilters} />
          }
          setOpen={setIsModalOpen}
          open={isModalOpen}
        />
      </div>

      <Table
        keys={keys}
        headings={headings}
        data={formattedInvoices}
        isLoading={isInvoiceLoading}
      />
      <InvoiceModel />
    </section>
  );
};

export default InvoicePage;
