import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { Recipe } from "../../context/types";

interface Props {}

const dietSchema: Recipe["dietLabels"] = [
  "balanced",
  "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  "low-sodium",
];

const healthSchema: Recipe["healthLabels"] = [
  "dairy-free",
  "egg-free",
  "fat-free",
  "fish-free",
  "gluten-free",
  "low-sugar",
  "paleo",
  "peanut-free",
  "shellfish-free",
  "soy-free",
  "tree-nut-free",
  "vegan",
  "vegetarian",
  "wheat-free",
];

const dataSchema = { diet: dietSchema, health: healthSchema };

const FilterOptions = (props: Props) => {
  return (
    <motion.div layout>
      test
      {() => console.log("test1")}
      <Grid container>
        {(Object.keys(dataSchema) as (keyof typeof dataSchema)[]).map((key) => (
          <Grid item xs={2}>
            <List
              disablePadding
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {key}
                </ListSubheader>
              }
              //  className={classes.root}
            >
              {(dataSchema[key] as string[]).map((value) => (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  // onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      // checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{}}
                    />
                  </ListItemIcon>
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default FilterOptions;
