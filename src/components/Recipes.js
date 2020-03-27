import React, { useContext } from "react";
import { Container, Row } from "reactstrap";

import { GlobalContext } from "../context/GlobalContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { Recipe } from "./Recipe";

export const Display = () => {
  const { items, itemsLoading } = useContext(GlobalContext);
  return (
    <Container className="d-flex">
      <Row className="w-100 justify-content-center">
        {itemsLoading ? (
          <LoadingSpinner />
        ) : items.hits ? (
          items.hits.length > 0 ? (
            items.hits.map(hit => <Recipe key={hit.recipe.uri} hit={hit} />)
          ) : (
            <h5 className="my-5">No results</h5>
          )
        ) : (
          <h5 className="my-5">Enter the ingredients</h5>
        )}
      </Row>
    </Container>
  );
};

export default Display;
