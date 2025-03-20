import { useEffect, useState, type FC } from "react";
import type { ToastNotificationProps } from "../ts/types";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import "./styles/toast.scss";

export const Toast: FC<ToastNotificationProps> = ({
  message,
  durationMs,
  type,
}) => {
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    setShowToast(true);

    const timer = setTimeout(() => {
      setShowToast(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [message, durationMs]);

  return (
    <div
      className={`toast ${type} ${showToast ? "show" : ""} absolute flex grow top-25 right-0 !py-1 !px-4 !pr-6 rounded-s-lg shadow-md text-white`}
    >
      <div className="!pr-2 flex items-center">
        {type === "error" ? (
          <MdOutlineReportGmailerrorred size={30} />
        ) : (
          <FaRegLightbulb size={30} />
        )}
      </div>
      <div className="">
        <span className="font-bold">{type === "error" ? "Error" : "Info"}</span>
        <br />
        {message}
      </div>
    </div>
  );
};
