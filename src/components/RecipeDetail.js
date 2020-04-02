import React, { useContext } from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { GlobalContext } from "../context/GlobalContext";

const notFound = <h6>Not found</h6>;

const RecipeDetail = ({ match: { params } }) => {
  const { items } = useContext(GlobalContext);
  const id = params.id;
  const recipe = items && items.hits && items.hits[id].recipe;

  if (!recipe) return notFound;

  return (
    <Card className="details page">
      <CardImg src={recipe.image} />
      <CardBody>{recipe.label}</CardBody>
    </Card>
  );
};

export default RecipeDetail;
