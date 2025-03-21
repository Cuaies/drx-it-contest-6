import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { ErrorMessagesEnum } from "../../ts/enums";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required: boolean;
}

export const Input: FC<InputProps> = ({
  label,
  type,
  id,
  placeholder,
  required,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col !w-full gap-2">
      <div className="flex justify-between items-center !h-6">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        {errors[id]?.message && typeof errors[id]?.message === "string" && (
          <span className="!p-1 rounded-sm bg-red-200 text-red-800 shadow-xs transition-all transition-discrete">
            <MdError /> {errors[id]?.message}
          </span>
        )}
      </div>
      <input
        id={id}
        type={type}
        className="!p-2 font-medium border rounded-md border-stone-300 bg-stone-100 placeholder:opacity-60 shadow-sm"
        placeholder={placeholder}
        aria-invalid={errors[id] ? "true" : "false"}
        {...register(id, {
          required: {
            value: required,
            message: ErrorMessagesEnum.Required,
          },
        })}
      />
    </div>
  );
};
