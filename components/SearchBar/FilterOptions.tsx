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
      <Grid container>
        {(Object.keys(dataSchema) as (keyof typeof dataSchema)[]).map((key) => (
          <Grid item xs={6}>
            <List
              style={{
                display: "flex",
                // justifyContent: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
                // width: "100%",
              }}
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {key}
                </ListSubheader>
              }
              //  className={classes.root}
            >
              {(dataSchema[key] as string[]).map((value) => (
                <Grid item xs={12} sm={6} lg={4}>
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
                </Grid>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default FilterOptions;
