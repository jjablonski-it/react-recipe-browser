import {
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Recipe from "./Recipe";

const MotionGrid = motion.custom(Grid);
const MotionPaper = motion.custom(Paper);
interface Props {
  recipe: RecipeInterface;
}

const maxWidth = 500;

const chipContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
};

const chipItemStyle: React.CSSProperties = {
  margin: 5,
  marginTop: 10,
};

const DetailedRecipe = ({ recipe }: Props) => {
  if (!recipe) return <></>;
  const { ingredientLines, healthLabels, dietLabels, url } = recipe;

  return (
    <MotionGrid
      container
      style={{
        position: "fixed",
        top: 20,
        zIndex: 101,
        width: "auto",
        maxWidth: "90vw",
        cursor: "grab",
      }}
      drag="y"
      draggable
      dragConstraints={{ top: -300, bottom: 0 }}
    >
      <MotionGrid
        container
        item
        layoutId={`container ${recipe.uri}`}
        style={{ justifyContent: "center", maxWidth }}
      >
        <MotionGrid item xs={12}>
          <Recipe
            recipe={recipe}
            setSelected={() => {}}
            selected={true}
            active={true}
          />
        </MotionGrid>
        <Grid
          item
          xs={12}
          style={{
            maxWidth,
            minWidth: 200,
            opacity: 0.98,
          }}
        >
          <MotionPaper
            style={{
              height: "100%",
              marginTop: -15,
              padding: "15px 0",
              textAlign: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={chipContainerStyle}>
              {healthLabels.map((lbl) => (
                <Chip label={lbl} color="secondary" style={chipItemStyle} />
              ))}
            </div>
            <div style={chipContainerStyle}>
              {dietLabels.map((lbl) => (
                <Chip label={lbl} style={chipItemStyle} />
              ))}
            </div>
            <List style={{ margin: 0 }}>
              {ingredientLines.map((ing) => (
                <>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={ing} />
                  </ListItem>
                </>
              ))}
              <Divider />
            </List>
            <Link
              color="secondary"
              href={url}
              variant={"h5"}
              style={{ marginBottom: 15 }}
              target="_blank"
            >
              Source
            </Link>
          </MotionPaper>
        </Grid>
      </MotionGrid>
    </MotionGrid>
  );
};

export default DetailedRecipe;
