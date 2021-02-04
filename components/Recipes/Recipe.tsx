import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Theme,
} from "@material-ui/core";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import { makeStyles } from "@material-ui/core";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";

interface Props {
  recipe: RecipeInterface;
}

export const useStyle = makeStyles<Theme, RecipeInterface>({
  root: {
    height: 300,
    background: ({ image }) => `url(${image})`,
  },
  menu: {
    position: "absolute",
    bottom: 0,
  },
  clickable: {
    height: "100%",
  },
});

const Recipe = ({ recipe }: Props) => {
  const { label, source } = recipe;
  const classes = useStyle(recipe);
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.clickable}>
        <CardHeader
          action={
            <IconButton aria-label="add to favorites">
              <FavoriteBorderOutlined />
            </IconButton>
          }
          title={label}
          subheader={source}
        />
      </CardActionArea>
    </Card>
  );
};

export default Recipe;
