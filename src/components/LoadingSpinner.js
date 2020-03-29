import React from "react";
import { Spinner } from "reactstrap";

export const LoadingSpinner = ({ lg }) => {
  const spinnerStyle = { width: "100px", height: "100px" };
  return (
    <Spinner
      size={lg ? "lg" : "md"}
      style={lg && spinnerStyle}
      className={"mx-auto my-2"}
    />
  );
};

export default LoadingSpinner;
