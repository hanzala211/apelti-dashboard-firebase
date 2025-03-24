import { ReactNode } from 'react';
import { TableSkeleton } from './TableSkeleton'; // Import the skeleton component

interface TableProps<T> {
  headings: string[];
  data: T[];
  keys: (keyof T)[];
  isLoading?: boolean;
  skeletonRowCount?: number;
}

export const Table = <T,>({
  headings,
  data,
  keys,
  isLoading = false,
  skeletonRowCount = 5,
}: TableProps<T>) => {
  if (isLoading) {
    return (
      <TableSkeleton headings={headings} skeletonRowCount={skeletonRowCount} />
    );
  }

  return (
    <div className="w-full mt-5 sm:max-h-[calc(100vh-270px)] max-h-[calc(100dvh-240px)] overflow-auto">
      <table className="w-full text-sm text-center text-gray-700">
        <thead className="sticky top-0 z-20 bg-paleGray border-silverGray border-b">
          <tr>
            {headings.map((heading, idx) => (
              <th
                key={idx}
                className={`px-6 py-4 font-medium text-[14px] text-slateGrey`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-silverGray last:border-0 hover:bg-gray-50"
            >
              {keys.map((key, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-[14px]">
                  {key === 'status' ? (
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${item[key] === 'approved'
                        ? 'bg-temporaryGreen text-graphGreen'
                        : item[key] === 'rejected'
                          ? 'bg-temporaryRed text-basicRed'
                          : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                      {(item[key] as string).slice(0, 1).toUpperCase() +
                        (item[key] as string).slice(1)}
                    </span>
                  ) : (
                    (item[key] as ReactNode)
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
