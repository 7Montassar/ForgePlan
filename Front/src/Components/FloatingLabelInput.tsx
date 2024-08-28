import { useState } from "react";

const FloatingLabelInput = ({ labelText, type, id, value, onChange, hasError }:{
  labelText: string,
  type: string,
  id: string,
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  hasError: boolean,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative text-left w-full">
      <input
        type={type}
        id={id}
        className={`border-[1px]  outline-none text-white text-lg font-semibold w-full p-2 rounded-md bg-transparent px-4 ${
          hasError ? "border-red-500" : "border-zinc-400"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        value={value}
      />

      <label
        htmlFor={id}
        className={`absolute  left-4  transition-all duration-300 ease ${
          isFocused || value || type !== "text"
            ? "px-2 -top-5 bg-zinc-900 text-zinc-200"
            : "top-2  text-zinc-300"
        }`}
      >
        {labelText}
      </label>
    </div>
  );
};

export default FloatingLabelInput;