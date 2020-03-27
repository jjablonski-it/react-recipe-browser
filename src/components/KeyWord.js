import React, { useContext } from "react";
import { Button } from "reactstrap";
import { GlobalContext } from "../context/GlobalContext";

export const Keyword = ({ keyword }) => {
  const { removeKeyword } = useContext(GlobalContext);
  const onClick = id => {
    removeKeyword(id);
  };

  return (
    <Button
      className="m-1"
      size="sm"
      color="danger"
      onClick={() => onClick(keyword)}
    >
      {keyword} &times;
    </Button>
  );
};
