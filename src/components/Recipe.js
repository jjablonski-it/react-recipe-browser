import React, { useState } from "react";

import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import "../styles.css";

// Components
import LoadingSpinner from "./LoadingSpinner";
import RecipeIcons from "./RecipeIcons";

export const Recipe = ({ recipe, id, setRecipeDom, recipeId }) => {
  const [loading, setLoading] = useState(true);
  const { image, label } = recipe;

  const fade = useSpring({
    o: recipeId === id ? 0 : 1,
    config: {
      duration: 150,
    },
  });

  return (
    <animated.div
      style={{
        opacity: fade.o.interpolate([0, 0.75, 1], [0, 0, 1]),
      }}
    >
      <Card className={loading ? "d-none" : "d-block"}>
        <Link to={`/${id}`} onClick={(e) => setRecipeDom(e.target)}>
          {loading && <LoadingSpinner />}
          <CardImg src={image} onLoad={() => setLoading(false)} />
          <CardBody>
            <CardTitle className="text-center">{label}</CardTitle>
            <RecipeIcons recipe={recipe} />
          </CardBody>
        </Link>
      </Card>
    </animated.div>
  );
};
