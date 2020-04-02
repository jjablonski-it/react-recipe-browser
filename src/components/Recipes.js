import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { GlobalContext } from "../context/GlobalContext";
import LoadingSpinner from "./LoadingSpinner";
import { Recipe } from "./Recipe";

export const Display = () => {
  const { items, itemsLoading } = useContext(GlobalContext);
  return (
    <Container className="d-flex page">
      <Row className="w-100 justify-content-center">
        {itemsLoading ? (
          <LoadingSpinner lg />
        ) : items.hits ? (
          items.hits.length > 0 ? (
            items.hits.map(hit => (
              <Col key={hit.recipe.uri} md={4} lg={3} xs={6} className="my-2">
                <Recipe recipe={hit.recipe} id={items.hits.indexOf(hit)} />
              </Col>
            ))
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
