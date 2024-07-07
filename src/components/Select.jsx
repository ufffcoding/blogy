import React, { useId } from "react";

function Select({ label, options = [], className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-gray-700 dark:text-gray-300 mb-2 block"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white outline-none focus:bg-gray-50 dark:focus:bg-gray-700 duration-200 border border-gray-200 dark:border-gray-600 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div >
  );
}

export default React.forwardRef(Select);
