import { useLocation, useNavigate } from "react-router-dom";
import { Button, FilterBtn, PageHeading, Table } from "@components";
import { iconsPath, INVOICES_DATA, ROUTES } from "@constants";
import { InvoiceItem } from "@types";
import { useEffect } from "react";
import { useInvoice } from "@context";
import InvoiceModel from "./components/InvoiceModel";

export const InvoicePage: React.FC = () => {
  const { setIsInvoiceModelOpen } = useInvoice()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes(`${ROUTES.invoices}/${ROUTES.add_invoice}`)) {
      setIsInvoiceModelOpen(true)
    } else {
      setIsInvoiceModelOpen(false)
    }
  }, [location])

  const handleClick = () => {
    setIsInvoiceModelOpen(true)
    navigate(`${ROUTES.invoices}/${ROUTES.add_invoice}`)
  }

  const filteredInvoices = location.search.includes("unpaid") ? INVOICES_DATA.filter((item) => item.status === "Unpaid") : location.search.includes("return") ? INVOICES_DATA.filter((item) => item.status === "Return") : location.search.includes("draft") ? INVOICES_DATA.filter((item) => item.status === "Draft") : INVOICES_DATA;

  const headings = [
    "Invoice number",
    "Uploads",
    "Supplier",
    "PO no.",
    "Account Plan",
    "Date of Creation",
    "Invoice Date",
    "Payment Term",
    "Amount",
    "Status",
  ]

  const keys: (keyof InvoiceItem)[] = [
    "invoiceNumber",
    "uploads",
    "supplier",
    "poNumber",
    "accountPlan",
    "dateOfCreation",
    "invoiceDate",
    "paymentTerm",
    "amount",
    "status",
  ]

  return (
    <section className="md:py-9 py-20 w-screen md:max-w-[calc(100vw-256px)]">
      <div className="md:px-14 px-2">
        <PageHeading label="Invoices" />
      </div>

      <div className="mt-5 md:px-14 px-2 flex md:gap-14 gap-4 w-fit">
        <FilterBtn
          label="All Invoices"
          bool={location.search === "" || location.search.includes("all")}
          onClick={() => navigate("?all=true")}
        />
        <FilterBtn
          label="Unpaid Invoices"
          bool={location.search.includes("unpaid")}
          onClick={() => navigate("?unpaid=true")}
        />
        <FilterBtn
          label="Return Invoices"
          bool={location.search.includes("return")}
          onClick={() => navigate("?return=true")}
        />
        <FilterBtn
          label="Draft Invoices"
          bool={location.search.includes("draft")}
          onClick={() => navigate("?draft=true")}
        />
      </div>

      <div className="flex mt-5 justify-between items-center md:px-14 px-2">
        <button className="text-accentBlue rounded-md transition-all duration-200 flex gap-1 hover:bg-softBlue px-2 py-1 items-center text-[18px]">
          <iconsPath.plusIcon size={24} /> Add Filters
        </button>
        <Button btnText="Add Invoice" handleClick={handleClick} />
      </div>

      <Table keys={keys} headings={headings} data={filteredInvoices} />
      <InvoiceModel />
    </section>
  );
};

export default InvoicePage;
