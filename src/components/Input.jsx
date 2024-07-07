import React from 'react';
import { forwardRef, useId } from 'react';

function Input({ label, type, inputClass = "", labelClass = "", placeholder, ...props }, ref) {
    const id = useId();
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 ${labelClass}`}
                >
                    {label}
                </label>
            )}
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 ${inputClass}`}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        </div>
    );
}

export default forwardRef(Input);
