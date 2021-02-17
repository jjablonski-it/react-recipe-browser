import { makeStyles, Theme } from "@material-ui/core";

export const useRecipeStyles = makeStyles<Theme, { selected: boolean }>(
  (theme) => ({
    root: {
      zIndex: ({ selected }) => (selected ? 1 : 0),
      height: 400,
      borderRadius: "3%",
      color: theme.palette.grey[50],
      width: "100%",
      position: "relative",
    },
    clickable: {
      height: "100%",
      width: "100%",
    },
    imageContainer: {
      height: "100%",
      width: "100%",
      position: "absolute",
      margin: 0,
      top: 0,
    },
    image: {
      width: 500,
    },
    overlay: {
      top: 0,
      left: 0,
      position: "absolute",
      height: "100%",
      width: "100%",
      zIndex: 1,
      background: `linear-gradient(rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 87%, rgba(0,0,0,.6) 100%)`,
    },
    header: {
      width: 260,
      padding: "inherit",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      position: "absolute",
      top: 0,
      zIndex: 2,
      height: "100%",
      width: "100%",
      padding: 4,
    },
    secondary: {
      color: theme.palette.grey[200],
    },
    footer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      marginTop: "auto",
      padding: "inherit",
      paddingBottom: "4px!important",
    },
    fab: {
      position: "absolute",
      right: 1,
      top: 5,
      zIndex: 2,
    },
  })
);

export const useDetailedRecipeStyles = makeStyles<Theme, { maxWidth: number }>({
  root: {
    position: "fixed",
    top: 20,
    zIndex: 101,
    width: "auto",
    maxWidth: "90vw",
    cursor: "grab",
  },
  mainGrid: {
    justifyContent: "center",
    maxWidth: ({ maxWidth }) => maxWidth,
  },
  paperGrid: {
    maxWidth: ({ maxWidth }) => maxWidth,
    minWidth: 200,
    opacity: 0.98,
  },
  paper: {
    height: "100%",
    marginTop: -15,
    padding: "15px 0",
    textAlign: "center",
  },
  list: {
    margin: 0,
  },
  link: {
    marginBottom: 15,
  },
});

export const useIconValueStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
  },
  value: {
    marginLeft: 2,
  },
});

export const useChipsStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  item: {
    margin: 5,
    marginTop: 10,
  },
});
