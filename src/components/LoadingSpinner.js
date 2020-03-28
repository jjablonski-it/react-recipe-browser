import React from "react";
import { Spinner } from "reactstrap";

export const LoadingSpinner = () => {
  const spinnerStyle = { width: "100px", height: "100px" };
  return <Spinner size="lg" style={spinnerStyle} className="my-4" />;
};
