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
} from "@material-ui/core";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import { makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

interface Props {
  recipe: RecipeInterface;
}

export const useStyle = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 150,
  },
});

const Recipe = ({ recipe: { image, label, source } }: Props) => {
  const classes = useStyle();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          action={
            <IconButton aria-label="add to favorites">
              <Favorite />
            </IconButton>
          }
          title={label}
          subheader={source}
        />
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Recipe;
