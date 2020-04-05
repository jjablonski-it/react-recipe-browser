import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect, Link } from "react-router-dom";
import { animated } from "react-spring";

const notFound = <h6>Not found</h6>;

const RecipeDetail = ({ recipeId, transitionProps }) => {
  const { items } = useContext(GlobalContext);
  console.log(recipeId);
  const recipe =
    recipeId != NaN &&
    recipeId >= 0 &&
    items &&
    items.hits &&
    items.hits[recipeId].recipe;

  if (!recipe) return <Redirect to="/" />;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        backgroundColor: "transparent",
        zIndex: 1,
      }}
    >
      <Link to="/">
        <animated.div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: transitionProps.backgroundColor,
            zIndex: 1,
          }}
        />
      </Link>
      <animated.div style={transitionProps}>
        <Card className="details">
          <CardImg src={recipe.image} />
          <CardBody>{recipe.label}</CardBody>
        </Card>
      </animated.div>
    </div>
  );
};

export default RecipeDetail;
