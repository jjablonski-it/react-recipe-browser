import React, { useContext, useState } from "react";
import { Input, Form, Button, Col, Row } from "reactstrap";

import { GlobalContext } from "../context/GlobalContext";

export const Search = () => {
  const { getItems, addKeyword, keywords } = useContext(GlobalContext);
  const [search, setSearch] = useState([]);

  const onChange = e => {
    if (e.target.value.slice(-1) === " ") {
      addKeyword(e.target.value.slice(0, -1));
      setSearch("");
    } else {
      setSearch(e.target.value);
    }
  };

  const submit = e => {
    e.preventDefault();
    getItems(keywords.join(" ") + " " + search);
  };

  return (
    <Form onSubmit={submit} inline>
      <Input
        onChange={onChange}
        value={search}
        name="search"
        className="flex-grow-1 mr-2"
      />
      <Button color="dark">Search</Button>
    </Form>
  );
};

export default Search;
