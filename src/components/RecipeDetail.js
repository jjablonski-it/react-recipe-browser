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

const notFound = <h6>Not found</h6>;

const RecipeDetail = ({ recipeId, transitionProps }) => {
  const { items } = useContext(GlobalContext);
  const recipe =
    recipeId != NaN &&
    recipeId >= 0 &&
    items &&
    items.hits &&
    items.hits[recipeId].recipe;

  const { image, label, ingredientLines, source, time, calories, url } = recipe;

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
        <Card
          className="details"
          style={{ maxHeight: "90vh", overflowY: "scroll" }}
        >
          <CardImg src={image} />
          <CardBody>
            <CardTitle>{label}</CardTitle>
            <hr />
            Ingredients:
            <ListGroup>
              {ingredientLines.map((line, i) => (
                <ListGroupItem key={i}>{line}</ListGroupItem>
              ))}
            </ListGroup>
            <hr />
            Source:{" "}
            <CardLink href={url} target="_blank">
              {source}
            </CardLink>
          </CardBody>
        </Card>
      </animated.div>
    </div>
  );
};

export default RecipeDetail;
