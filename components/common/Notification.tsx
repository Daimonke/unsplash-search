import React from "react";

type Props = {
  children: React.ReactNode;
  options?: React.HTMLAttributes<HTMLHeadingElement>;
};

const Notification = ({ children, ...options }: Props) => {
  return (
    <h1 className="mt-4 text-lg font-bold" {...options}>
      {children}
    </h1>
  );
};

export default Notification;
