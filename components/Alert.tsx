import React from "react";

import { Alert as AlertMUI } from "@material-ui/lab";

interface Props {
  handleClose: () => void;
}

const Alert: React.FC<Props> = ({ children, handleClose, open }) => {
  return (
    <AlertMUI
      severity="error"
      style={{ width: "80%", position: "fixed", bottom: 10 }}
      onClose={handleClose}
    >
      {children}
    </AlertMUI>
  );
};

export default Alert;
