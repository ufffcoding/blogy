import React from 'react';

export default function Button({ children, type = "button", className, ...props }) {
    return (
        <button
            type={type}
            className={`px-4 py-2 w-full rounded-md bg-black shadow dark:bg-gray-800 font-semibold text-white hover:bg-black/80 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-gray-600 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
