import React from "react";
import { Spinner, Container } from "reactstrap";

export const LoadingSpinner = () => {
  const spinnerStyle = { width: "100px", height: "100px" };
  return <Spinner size="lg" style={spinnerStyle} className="my-4" />;
};
