import React from "react";

interface AlertProps {
  message: string;
}

export function Alert(props: AlertProps): JSX.Element {
  return (
    <div
      className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative mb-2 text-center"
      role="alert"
    >
      <span className="sm:inline block">{props.message}</span>
    </div>
  );
}
