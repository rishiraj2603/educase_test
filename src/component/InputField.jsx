import { useId } from "react";

const InputField = ({
  label,
  type = "text",
  className = "",

  required = false,
  ...props
}) => {
  const id = useId();

  return (
    <div className="w-full relative">
      <label
        className={` absolute text-violet-800 bg-white left-[10px] bottom-[29px] px-2 block text-[12px] font-medium mb-1 `}
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        className={`w-full px-4 py-[3px] border rounded-lg focus:outline-none focus:ring-1 placeholder:text-sm ${className}`}
        id={id}
        {...props}
      />
    </div>
  );
};

export default InputField;
