import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  ListGroup,
  ListGroupItem,
  CardLink,
} from "reactstrap";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect, Link } from "react-router-dom";
import { animated } from "react-spring";
import RecipeIcons from "./RecipeIcons";

const RecipeDetail = ({ recipeId, transitionProps }) => {
  const { items } = useContext(GlobalContext);
  const recipe =
    !isNaN(recipeId) &&
    recipeId >= 0 &&
    items &&
    items.hits &&
    items.hits[recipeId].recipe;

  const { image, label, ingredientLines, source, url } = recipe;

  if (!recipe) return <Redirect to="/" />;

  return (
    <div
      style={{
        height: "150vh",
        width: "150vw",
        position: "fixed",
        backgroundColor: "transparent",
        zIndex: 1,
        overflow: "hidden",
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
        <Card
          className="details"
          style={{ maxHeight: "85vh", overflowY: "scroll" }}
        >
          <CardImg src={image} />
          <CardBody>
            <CardTitle className="text-center">{label}</CardTitle>
            <RecipeIcons recipe={recipe} />
            <h5>Ingredients:</h5>
            <ListGroup>
              {ingredientLines.map((line, i) => (
                <ListGroupItem key={i}>{line}</ListGroupItem>
              ))}
            </ListGroup>
            <h5 className="text-center my-3">
              Source:{" "}
              <CardLink href={url} target="_blank">
                {source}
              </CardLink>
            </h5>
          </CardBody>
        </Card>
      </animated.div>
    </div>
  );
};

export default RecipeDetail;
