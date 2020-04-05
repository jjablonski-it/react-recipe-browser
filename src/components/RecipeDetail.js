import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect, Link } from "react-router-dom";
import { useTransition, animated, useSpring } from "react-spring";

const notFound = <h6>Not found</h6>;

const RecipeDetail = ({ match: { params }, transitionProps, key }) => {
  const { items } = useContext(GlobalContext);
  const id = params.id;
  let recipe = items && items.hits && items.hits[id].recipe;

  useEffect(() => {
    return () => {
      console.log("Unmount");
    };
  }, []);

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
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
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
