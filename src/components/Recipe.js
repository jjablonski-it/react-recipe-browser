import React from "react";

import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

export const Recipe = ({ recipe, id }) => {
  const { image, label } = recipe;
  return (
    <Card>
      <CardImg src={image}></CardImg>
      <CardBody>
        {/* <a href={hit.url}>{hit.label}</a> */}
        <Link to={`/${id}`}>{label}</Link>
      </CardBody>
    </Card>
  );
};
