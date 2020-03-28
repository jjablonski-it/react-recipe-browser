import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

// Components
import Keyword from "./Keywordd";

export const Keywords = () => {
  const { keywords } = useContext(GlobalContext);

  return keywords.map(kw => (
    <Keyword key={keywords.indexOf(kw)} keyword={kw} />
  ));
};

export default Keywords;
