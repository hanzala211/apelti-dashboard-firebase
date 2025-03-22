import { useEffect, useState } from 'react';
import { useAuth, useInvoice } from '@context';
import { FilterTypes, Invoice } from '@types';
import {
  APP_ACTIONS,
  DATE_FOMRAT,
  ICONS,
  INVOICES_DATA,
  PERMISSIONS,
  ROUTES,
} from '@constants';
import InvoiceModel from './components/InvoiceModel';
import InvoiceFilter from './components/InvoiceFilter';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  DraggableModal,
  FilterBtn,
  PageHeading,
  Table,
} from '@components';
import dayjs from 'dayjs';

export const InvoicePage: React.FC = () => {
  const { userData } = useAuth();
  const { setIsInvoiceModelOpen } = useInvoice();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [filters, setFilters] = useState<FilterTypes[]>([
    { id: 1, field: '', condition: '', value: '' },
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  useEffect(() => {
    setFilteredInvoices(
      location.search.includes('unpaid')
        ? INVOICES_DATA.filter((item) => item.status === 'Unpaid')
        : location.search.includes('return')
          ? INVOICES_DATA.filter((item) => item.status === 'Return')
          : location.search.includes('draft')
            ? INVOICES_DATA.filter((item) => item.status === 'Draft')
            : INVOICES_DATA
    );
  }, [location.search]);

  const handleClick = () => {
    setIsInvoiceModelOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFilters = () => {
    let filteredValues = INVOICES_DATA;

    filteredValues = filteredValues.filter((invoice) => {
      for (const filter of filters) {
        if (!filter.field || !filter.condition || !filter.value) continue;

        switch (filter.field) {
          case 'businessName':
          case 'clientName': {
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

          case 'date':
          case 'dueDate': {
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
          case 'total': {
            const filterAmount = parseFloat(filter.value);
            const invoiceAmount = parseFloat(invoice[filter.field]);

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
    'Business Name',
    'Client Name',
    'Date',
    'Due Date',
    'Total',
    'Status',
  ];

  const keys: (keyof Invoice)[] = [
    'invoiceNumber',
    'businessName',
    'clientName',
    'date',
    'dueDate',
    'total',
    'status',
  ];

  if (!userPermissions.includes(APP_ACTIONS.invoicePage))
    return <Navigate to={ROUTES.not_available} />;

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

      <Table keys={keys} headings={headings} data={filteredInvoices} />
      <InvoiceModel />
    </section>
  );
};

export default InvoicePage;
