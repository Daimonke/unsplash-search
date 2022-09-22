import React from "react";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="focus:ring outline-none rounded-lg text-white bg-blue-600 px-8 py-2 font-bold active:scale-95 hover:opacity-90"
      {...props}
    />
  );
};

export default Button;
