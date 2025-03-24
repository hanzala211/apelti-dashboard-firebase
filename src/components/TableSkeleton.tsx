import React from 'react';
import { Skeleton } from 'antd';

interface TableSkeletonProps {
  headings: string[];
  skeletonRowCount?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  headings,
  skeletonRowCount = 5,
}) => {
  return (
    <div className="w-full mt-5 sm:max-h-[calc(100vh-280px)] max-h-[calc(100dvh-260px)] overflow-auto">
      <table className="w-full text-sm text-center text-gray-700">
        <thead className="sticky top-0 z-20 bg-paleGray border-b border-silverGray">
          <tr>
            {headings.map((_, idx) => (
              <th
                key={idx}
                className="px-6 py-4 font-medium text-[14px] text-slateGrey"
              >
                <Skeleton.Button active size="small" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-silverGray last:border-0 hover:bg-gray-50"
            >
              {headings.map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-[14px]">
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 1, width: '100%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton