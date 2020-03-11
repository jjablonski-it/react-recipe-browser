import React, { useContext, useState } from "react";
import { Input, Form } from "reactstrap";

import { GlobalContext } from "../context/GlobalContext";

export const Search = () => {
  const { getItems } = useContext(GlobalContext);
  const [search, setSearch] = useState([]);

  const onChange = e => {
    setSearch(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    getItems(search);
  };

  return (
    <Form onSubmit={submit}>
      <Input onChange={onChange} value={search} name="search"></Input>
    </Form>
  );
};

export default Search;
