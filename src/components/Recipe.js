import React, { useState } from "react";

import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import "../styles.css";

// Components
import LoadingSpinner from "./LoadingSpinner";

export const Recipe = ({ recipe, id, setRecipeDom, recipeId }) => {
  const [loading, setLoading] = useState(true);
  const { image, label } = recipe;
  const _yield = recipe.yield;

  const fade = useSpring({
    o: recipeId === id ? 0 : 1,
    config: {
      duration: 150,
    },
  });

  return (
    <Link to={`/${id}`} onClick={(e) => setRecipeDom(e.target)}>
      <animated.div
        style={{
          opacity: fade.o.interpolate([0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0, 1]),
        }}
      >
        <Card className={loading ? "d-none" : "d-block"}>
          {loading && <LoadingSpinner />}
          <CardImg src={image} onLoad={() => setLoading(false)} />
          <CardBody>
            <CardTitle>
              {label}
              <span className="float-right">{_yield}</span>
            </CardTitle>
          </CardBody>
        </Card>
      </animated.div>
    </Link>
  );
};
