import {
  Checkbox,
  Grid,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";
import { useAnimatedState } from "framer-motion/types/animation/use-animated-state";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { FilterValues, Recipe } from "../../context/types";
import Chips from "../Recipes/Chips";

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
  const { setFilters, addExclude, removeExclude, exclude } = useContext(
    Context
  );

  const [state, setState] = useState<{
    health: Recipe["healthLabels"];
    diet: Recipe["dietLabels"];
  }>({ health: [], diet: [] });
  // const [health, setHealth] = useState<string[]>([]);
  // const [diet, setDiet] = useState<string[]>([]);

  const handleToggle = (key: keyof typeof state, value: FilterValues) => {
    let cState = [...state[key]] as FilterValues[];
    console.log(typeof value);

    if (!cState.includes(value) && !exclude.includes(value)) {
      cState.push(value);
    } else if (cState.includes(value) && !exclude.includes(value)) {
      cState = cState.filter((val) => val !== value);
      addExclude!(value);
    } else {
      removeExclude!(value);
    }
    setState((s) => ({ ...s, [key]: cState }));
  };

  useEffect(() => {
    setFilters!(state);
  }, [exclude, state]);

  return (
    <motion.div layout>
      <Grid container>
        {(Object.keys(dataSchema) as (keyof typeof dataSchema)[]).map((key) => (
          <Grid item xs={6} key={key}>
            <List
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
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
            >
              {(dataSchema[key] as FilterValues[]).map((value) => (
                <Grid item xs={12} sm={6} lg={4} key={value}>
                  <ListItem
                    role={undefined}
                    dense
                    button
                    onClick={() => handleToggle(key, value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={
                          (state[key] as any).includes(value) ||
                          exclude.includes(value)
                        }
                        indeterminate={exclude.includes(value)}
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
