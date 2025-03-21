import type { ReactNode } from "react";
import { FiEye } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

export const renderActionRow = (item: Record<string, unknown>): ReactNode => {
  return (
    <tr className="text-pretty break-words">
      {Object.values(item).map((val: any, index) => (
        <td
          key={index}
          className="text-sm break-words max-w-xs overflow-hidden text-ellipsis text-center"
        >
          {/* TODO: fix */}
          {true ? val : new Date(val).toLocaleString()}
        </td>
      ))}
      <td key={50}>
        <div className="flex align-center justify-center gap-2">
          <button
            disabled
            className="disabled:opacity-25 disabled:cursor-not-allowed flex align-center justify-center gap-2 rounded-full cursor-pointer !p-2 !my-2 text-black bg-yellow-200 dark:text-white dark:bg-yellow-500"
          >
            <FiEye />
          </button>
          <button
            disabled
            className="disabled:opacity-25 disabled:cursor-not-allowed flex align-center justify-center gap-2 rounded-full cursor-pointer !p-2 !my-2 text-black bg-red-200 dark:text-white dark:bg-red-400"
          >
            <MdOutlineDeleteOutline />
          </button>
        </div>
      </td>
    </tr>
  );
};
