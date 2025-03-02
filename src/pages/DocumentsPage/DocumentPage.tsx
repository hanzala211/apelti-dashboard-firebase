import { Button, PageHeading } from "@components";
import { DocumentTable } from "./components/DocumentTable";
import { DOCUMENTS_DATA } from "@constants";
import { IDocument } from "@types";
import { useEffect, useState } from "react";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";

export const DocumentPage: React.FC = () => {
  const [searchData, setSearchData] = useState<IDocument[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");

  useEffect(() => {
    if (searchInput.length > 1 || searchDate) {
      handleSearch();
    } else {
      setSearchData([]);
    }
  }, [searchInput, searchDate]);

  const handleSearch = () => {
    const foundSearches = DOCUMENTS_DATA.filter((item) => {
      const matchesName =
        searchInput.trim().length > 0
          ? item.name.toLowerCase().includes(searchInput.toLowerCase())
          : false;
      const matchesDate = searchDate ? item.added === searchDate : false;

      return matchesName || matchesDate;
    });

    setSearchData(foundSearches);
  };

  const handleChange: DatePickerProps["onChange"] = (_, dateString) => {
    const formattedDate = Array.isArray(dateString) ? dateString[0] : dateString;
    setSearchDate(formattedDate);
  };

  return (
    <section className="md:px-14 md:py-9 px-2 py-20">
      <PageHeading label="Documents" />
      <div className="mt-8 w-full xl:max-w-[70%] max-w-full">
        <div className="flex justify-between flex-wrap gap-5 md:gap-0 items-center">
          <div className="flex gap-7 flex-wrap">
            <div className="flex gap-2 items-center">
              <label htmlFor="name" className="text-[14px] md:text-[16px]">Name</label>
              <input
                type="text"
                id="name"
                className="focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 rounded-md px-2 py-1 text-[14px] border-[1px] md:w-auto w-52"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="date" className="text-[14px] md:text-[16px]">Added</label>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                className="px-2 py-1 text-[14px] border-[1px] md:w-auto w-52"
                value={searchDate ? dayjs(searchDate, "DD/MM/YYYY") : null}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button btnText="Add Invoice" />
        </div>
        <div className="h-[55dvh] sm:h-[70dvh] lg:h-[73dvh] overflow-y-auto md:mt-4">
          <DocumentTable searchData={searchData} />
        </div>
      </div>
    </section>
  );
};

export default DocumentPage;
