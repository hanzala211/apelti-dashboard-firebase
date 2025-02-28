import React from "react";

interface TableProps<T> {
  headings: string[];
  data: T[];
  keys: (keyof T)[];
}

export const Table = <T,>({ headings, data, keys }: TableProps<T>) => {
  return (
    <div className="w-full mt-5 md:max-h-[calc(100vh-280px)] max-h-[calc(100vh-260px)] overflow-x-auto overflow-y-auto">
      <table className="w-full text-center border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 bg-gray-100">
          <tr>
            {headings.map((heading, idx, arr) => (
              <th
                key={idx}
                className={`xl:p-4 p-3 md:text-[16px] text-[13px] border-basicBlack ${idx === 0 ? "border-r" : idx === arr.length - 1 ? "border-l" : "border-x"
                  }`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key, colIndex) => (
                <td key={colIndex} className="xl:p-4 p-3 md:text-[16px] text-[13px] border-b border-silverGray">
                  {key === "status" ? (
                    <span
                      className={`inline-block ${item[key] === "Paid"
                        ? "bg-basicGreen text-basicWhite"
                        : item[key] === "Unpaid"
                          ? "bg-basicRed text-basicWhite"
                          : "bg-transparent text-basicBlack border border-basicBlack"
                        } text-sm px-2 py-1 rounded`}
                    >
                      {item[key] as string}
                    </span>
                  ) : (
                    item[key] as React.ReactNode
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
