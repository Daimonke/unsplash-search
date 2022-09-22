import React from "react";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="h-14 w-full rounded-md py-4 px-4 outline-none focus:ring-1 focus:bg-blue-200 transition-all bg-blue-100 border-2 border-blue-300"
      {...props}
    />
  );
};

export default Input;
