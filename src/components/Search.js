import React, { useContext, useState } from "react";
import { Input, Form, Button } from "reactstrap";

import { GlobalContext } from "../context/GlobalContext";

export const Search = () => {
  const { getItems, addKeyword, keywords } = useContext(GlobalContext);
  const [search, setSearch] = useState([]);

  const fromInputToKeywords = (kw) => {
    const keyword = kw.slice(-1) === " " ? kw.slice(0, -1) : kw;
    addKeyword(keyword);
    setSearch("");
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value.slice(-1) === " ") {
      fromInputToKeywords(value);
    } else {
      setSearch(value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    fromInputToKeywords(search);
    getItems(keywords);
  };

  return (
    <Form onSubmit={submit} className="d-flex">
      <Input
        onChange={onChange}
        value={search}
        name="search"
        className="mr-2 d-inline"
      />
      <Button color="dark">Search</Button>
    </Form>
  );
};

export default Search;
