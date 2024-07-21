/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-2 py-4 rounded-lg ${className} ${bgColor} ${textColor} {...props}`}
    >
      {children}
    </button>
  );
}

export default Button;
