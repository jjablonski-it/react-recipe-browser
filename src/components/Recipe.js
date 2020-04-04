import React, { useState } from "react";

import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "../styles.css";

// Components
import LoadingSpinner from "./LoadingSpinner";

export const Recipe = ({ recipe, id, setRecipeDom }) => {
  const [loading, setLoading] = useState(true);
  const { image, label } = recipe;

  return (
    <Link to={`/${id}`} onClick={(e) => setRecipeDom(e.target)}>
      <Card className={loading ? "d-none" : "d-block"}>
        {loading && <LoadingSpinner />}
        <CardImg src={image} onLoad={() => setLoading(false)} />
        <CardBody>{label}</CardBody>
      </Card>
    </Link>
  );
};
