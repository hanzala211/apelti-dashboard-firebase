import { iconsPath } from "@constants";
import { ReactSVG } from "react-svg";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FilterTypes } from "@types";

interface InvoiceFilterProps {
  filters: FilterTypes[];
  setFilters: React.Dispatch<React.SetStateAction<FilterTypes[]>>;
}

const InvoiceFilter: React.FC<InvoiceFilterProps> = ({ filters, setFilters }) => {

  const addFilter = () => {
    setFilters([...filters, { id: filters.length + 1, field: "", condition: "", value: "" }]);
  }

  const removeFilter = (id: number) => {
    setFilters(filters.filter(filter => filter.id !== id));
  }

  const updateFilter = (id: number, key: string, value: string) => {
    setFilters(filters.map(filter =>
      filter.id === id ? { ...filter, [key]: value } : filter
    ));
  }

  const onDateChange = (_: dayjs.Dayjs, dateString: string | string[], id: number) => {
    const formattedDate = Array.isArray(dateString) ? dateString[0] : dateString;
    updateFilter(id, "value", formattedDate);
  }

  const filterOptions = [
    { label: "Invoice Number", value: "invoiceNumber" },
    { label: "Supplier", value: "supplier" },
    { label: "PO no.", value: "poNumber" },
    { label: "Account Plan", value: "accountPlan" },
    { label: "Date of Creation", value: "dateOfCreation" },
    { label: "Payment Term", value: "paymentTerm" },
    { label: "Amount", value: "amount" },
  ]

  return (
    <div className="w-full relative h-full">
      <div className="flex flex-col gap-2">
        {filters.map(filter => {
          const selectedFields = filters
            .filter(f => f.id !== filter.id && f.field)
            .map(f => f.field)

          return (
            <div key={filter.id} className="flex items-center gap-2">
              <p>Where</p>
              <select className="w-full rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 bg-white py-1.5 px-3 border-basicBlack border-[1px]" value={filter.field} onChange={(e) => updateFilter(filter.id, "field", e.target.value)}>
                <option value="">Filter</option>
                {filterOptions
                  .filter(option =>
                    !selectedFields.includes(option.value)
                  )
                  .map((option, idx) => (
                    <option key={idx} value={option.value}>{option.label}</option>
                  ))}
              </select>

              <select
                className="w-full rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 bg-white py-1.5 px-3 border-basicBlack border-[1px]"
                value={filter.condition}
                onChange={(e) => updateFilter(filter.id, "condition", e.target.value)}
              >
                <option value="">Condition</option>
                {(filter.field !== "dateOfCreation" && filter.field !== "paymentTerm" && filter.field !== "amount" && filter.field !== "poNumber" && filter.field !== "invoiceNumber") &&
                  <>
                    <option value="contains">contains</option>
                    <option value="equals">equals</option>
                    <option value="startsWith">starts with</option>
                  </>
                }
                {(filter.field === "dateOfCreation" || filter.field === "paymentTerm") &&
                  <>
                    <option value="before">before</option>
                    <option value="after">after</option>
                    <option value="on">on</option>
                  </>
                }
                {(filter.field === "amount" || filter.field === "poNumber" || filter.field === "invoiceNumber") &&
                  <>
                    <option value="equal">is equal to</option>
                    <option value="greater">greater than</option>
                    <option value="lesser">lesser than</option>
                  </>
                }
              </select>

              {(filter.field !== "dateOfCreation" && filter.field !== "paymentTerm") ?
                <input type="text" placeholder="Enter value..." className="bg-white rounded-md w-full py-1.5 px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200" value={filter.value} onChange={(e) => updateFilter(filter.id, "value", e.target.value)}
                />
                :
                <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" className="bg-white rounded-md w-full py-1.5 px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200" value={filter.value ? dayjs(filter.value, "DD/MM/YYYY") : null} onChange={(date, dateString) => onDateChange(date, dateString, filter.id)} />
              }

              <ReactSVG src={iconsPath.close} className="cursor-pointer" onClick={() => removeFilter(filter.id)}
                beforeInjection={(svg) => {
                  svg.style.width = "20px";
                }} />
            </div>
          );
        })}
      </div>
      <button onClick={addFilter} className="mt-2 flex gap-2 items-center text-neutralGray absolute top-full translate-y-1/2 text-sm">
        <iconsPath.plusIcon /> Add Filter
      </button>
    </div>
  );
};

export default InvoiceFilter;
