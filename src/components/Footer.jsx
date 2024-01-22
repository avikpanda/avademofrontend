import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    padding: `${theme.typography.pxToRem(2)} ${theme.typography.pxToRem(10)}`,
    opacity: 0.8,
    color: "#FAFAFA",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100vw",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="flex-end"
      className={classes.headerRoot}
    >
      <Typography variant="body1" color="textSecondary">
        © Copyright 2024 AI-Scream. All Rights Reserved.
      </Typography>
    </Grid>
  );
}
