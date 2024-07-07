import React, { useEffect, useId, useState } from 'react';

const FilePicker = React.forwardRef(({ label, type = "file", accept, className = "", ...props }, ref) => {
    const id = useId();

    return (
        <div className="flex flex-col items-center gap-4">
            {label && (
                <label
                    className="text-gray-700 dark:text-gray-300 block"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                type={type}
                ref={ref}
                accept={accept}
                className={`block w-full text-sm text-slate-500 file:mr-4 dark:file:bg-gray-800 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-gray-100 dark:hover:file:bg-gray-700 hover:file:bg-black/80 ${className}`}
                {...props}
            />
        </div>
    );
});

export default FilePicker;
