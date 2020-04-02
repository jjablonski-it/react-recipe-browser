import React, { useState } from "react";

import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "../styles.css";

// Components
import LoadingSpinner from "./LoadingSpinner";

export const Recipe = ({ recipe, id }) => {
  const [loading, setLoading] = useState(true);
  const { image, label } = recipe;

  return (
    //   <CSSTransition
    //     in={!loading}
    //     timeout={500}
    //     classNames="fade"
    //     mountOnEnter={false}
    //     unmountOnExit={false}
    //   >
    <Card className={loading ? "d-none" : "d-block"}>
      {loading && <LoadingSpinner />}
      <CardImg src={image} onLoad={() => setLoading(false)} />
      <CardBody>
        <Link to={`/${id}`}>{label}</Link>
      </CardBody>
    </Card>
    // </CSSTransition>
  );
};
