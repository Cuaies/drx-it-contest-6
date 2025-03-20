import type { TableProps } from "../ts/types";

export const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <div className="overflow-x-auto !m-4">
      <table className="min-w-full mt-4 table-auto border-collapse md:table-fixed">
        <thead>
          <tr className="text-left text-gray-500">
            {columns.map((column) => {
              return (
                <th
                  key={column.header}
                  className="py-2 px-4 text-sm font-semibold text-gray-700 dark:text-gray-400"
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-gray-100 dark:divide-gray-700">
          {data.map((item) => renderRow(item))}
        </tbody>
      </table>
    </div>
  );
};
