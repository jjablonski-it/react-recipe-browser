import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Diet, FilterValues, Health } from "../../context/types";

interface Props {}

const dietSchema: Diet[] = [
  "balanced",
  // "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  // "low-sodium",
];

const healthSchema: Health[] = [
  "alcohol-free",
  // "celery-free",
  // "crustacean-free",
  // "dairy-free",
  // "egg-free",
  // "fish-free",
  // "fodmap-free",
  // "friendly",
  // "gluten-free",
  "immuno-supportive",
  // "keto-friendly",
  // "kosher",
  // "low-sugar",
  // "low-fat-abs",
  // "low-potassium",
  // "lupine-free",
  // "mustard-free",
  // "o-oil-added",
  // "paleo",
  "peanut-free",
  // "pecatarian",
  // "pork-free",
  // "red-meat-free",
  // "sesame-free",
  // "shellfish-free",
  // "soy-free",
  "sugar-conscious",
  "tree-nut-free",
  "vegan",
  "vegetarian",
  // "wheat-free",
];

const dataSchema = { diet: dietSchema, health: healthSchema };

const variants: Variants = {
  hidden: {
    opacity: 0,
    height: "0%",
  },
  show: {
    opacity: 1,
    height: "auto",
  },
};

const FilterOptions = (props: Props) => {
  const { setFilters, excluded, filters } = useContext(Context);

  const [state, setState] = useState<{
    health: Health[];
    diet: Diet[];
  }>(filters);

  const handleToggle = (key: keyof typeof state, value: FilterValues) => {
    let cState = [...state[key]] as FilterValues[];

    if (!cState.includes(value)) {
      cState.push(value);
    } else {
      cState = cState.filter((val) => val !== value);
    }
    setState((s) => ({ ...s, [key]: cState }));
  };

  useEffect(() => {
    setFilters!(state);
  }, [state]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
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
                          excluded.includes(value)
                        }
                        indeterminate={excluded.includes(value)}
                        disableRipple
                        inputProps={{}}
                      />
                    </ListItemIcon>
                    <ListItemText primary={value.replace("-", " ")} />
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
