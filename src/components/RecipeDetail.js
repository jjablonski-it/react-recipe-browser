import React, { useContext } from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect, Link } from "react-router-dom";
import { useTransition, animated, useSpring } from "react-spring";
import { positionDom, parentDom } from "./Dom";

const notFound = <h6>Not found</h6>;

const RecipeDetail = ({ match: { params }, recipeDom }) => {
  //const nimCard = animated(Card);
  const { items } = useContext(GlobalContext);
  const id = params.id;
  let recipe = items && items.hits && items.hits[id].recipe;

  const recipeParentDom = parentDom(recipeDom, "card");

  const pos =
    Object.keys(recipeDom).length > 0 ? positionDom(recipeParentDom) : null;

  const transition = useTransition([recipe], (recipe) => recipe.uri, {
    from: {
      opacity: 1,
      position: "absolute",
      transform: "translate(0%,0%)",
      ...pos,
    },
    enter: {
      position: "fixed",
      opacity: 1,
      width: window.innerWidth * 0.3,
      height: window.innerHeight * 0.3,
      left: window.innerWidth / 2,
      top: 25,
      transform: "translate(-50%, 0)",
    },
    leave: {
      opacity: 1,
      position: "absolute",
      transform: "translate(0%,0%)",
      ...pos,
    },
    config: {
      duration: 250,
    },
  });

  if (!recipe) return <Redirect to="/" />;

  return transition.map(({ item, props, key }) => (
    <animated.div
      key={key}
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
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 1,
          }}
          onClick={() => {
            recipe = null;
          }}
        />
      </Link>
      <animated.div style={{ zIndex: 2, ...props }}>
        <Card className="details">
          <CardImg src={recipe.image} />
          <CardBody>{recipe.label}</CardBody>
        </Card>
      </animated.div>
    </animated.div>
  ));
};

export default RecipeDetail;
