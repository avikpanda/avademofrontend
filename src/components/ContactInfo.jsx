import React from "react";
import { Grid, Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import useTimer from "../hooks/useTimer";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(20)}`,
  },
  root: {
    height: "33.33%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(25)} ${theme.typography.pxToRem(
      10
    )} ${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(20)}`,
  },
  subtitleContainer: {
    padding: `0 ${theme.typography.pxToRem(20)}`,
  },
  custInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `0 ${theme.typography.pxToRem(20)}`,
    marginTop: theme.typography.pxToRem(20),
  },
  avatar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "aliceblue",
  },
  hangup: {
    backgroundColor: theme.palette.primary.main,
    padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(30)}`,
  },
  title: {
    marginTop: theme.typography.pxToRem(10),
    display: "flex",
    width: "100%",
  },
  label: {
    minWidth: "33.33%",
  },
}));

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  const t = [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
    .filter(Boolean)
    .join(":");
  return t;
}

export default function ContactInfo() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [duration, setDuration] = React.useState(0);

  const isSimulationStarted = useSelector(
    (state) => state.applicationDataReducer.isSimulationStarted
  );

  const timerDuration = useTimer(0, isSimulationStarted);

  React.useEffect(() => {
    if (!isSimulationStarted) setDuration(timerDuration);
  }, [isSimulationStarted]);

  const disconnectCall = () => {
    if (isSimulationStarted)
      dispatch({
        type: "SET_SIMULATION_STARTED",
        payload: false,
      });
    else
      dispatch({
        type: "RESET_REDUCERS",
      });
  };

  return (
    <Grid item xs={6} className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">Contact Info</Typography>
        <br />
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={classes.subtitleContainer}
        >
          <Avatar aria-label="recipe" className={classes.avatar}>
            AD
          </Avatar>
          <Typography>
            {isSimulationStarted
              ? formatTime(timerDuration)
              : formatTime(duration)}
          </Typography>
          <Button className={classes.hangup} onClick={disconnectCall}>
            {isSimulationStarted ? "Hangup Call" : "Home"}
          </Button>
        </Grid>
        <div className={classes.custInfoContainer}>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Name :</div>
            Abhijeet Dey
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Mobile :</div>
            +91 986-166-4662
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Email :</div>
            abhijeet.dey@highradius.com
          </Typography>
        </div>
      </Card>
    </Grid>
  );
}
