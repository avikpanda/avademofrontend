import clsx from "clsx";
import { Grid, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(20)}`,
  },
  root: {
    height: "100%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(25)} ${theme.typography.pxToRem(
      10
    )} ${theme.typography.pxToRem(30)} ${theme.typography.pxToRem(20)}`,
  },
}));

const instructions = [
  {
    id: 1,
    type: "info",
    text: "Hello Bhai",
  },
];

export default function InstructionsCard() {
  const classes = useStyles();
  return (
    <Grid item xs={6} className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">Instructions</Typography>
        <ul>
          {instructions.map((item) => (
            <li
              key={item.id}
              className={clsx({
                [classes.info]: item.type === "info",
                [classes.warn]: item.type === "warn",
                [classes.error]: item.type === "error",
              })}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </Card>
    </Grid>
  );
}
