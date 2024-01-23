import { useState } from "react";
import clsx from "clsx";
import { Grid, Card, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhoneCallbackRoundedIcon from "@material-ui/icons/PhoneCallbackRounded";
import InstructionsCard from "../components/InstructionsCard";
import InitiateWizardCard from "../components/InitiateWizardCard";

const useStyles = makeStyles((theme) => ({
  ctaIcon: {
    background: "transparent",
    border: 0,
    borderRadius: theme.typography.pxToRem(5),
    color: "white",
    padding: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(50)}`,
    fontSize: theme.typography.pxToRem(50),
  },
  ctaRobo: {
    background: "transparent",
    border: 0,
    borderRadius: theme.typography.pxToRem(5),
    padding: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(50)}`,
    height: theme.typography.pxToRem(75),
    width: theme.typography.pxToRem(75),
  },

  root: {
    height: `calc(100vh - ${theme.typography.pxToRem(51)})`,
    marginTop: theme.typography.pxToRem(51),
  },
  card: {
    height: "100%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(20)}`,
  },
  fullHeight: {
    height: "100%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(25)} ${theme.typography.pxToRem(
      20
    )} ${theme.typography.pxToRem(30)} ${theme.typography.pxToRem(10)}`,
  },
  fullHeight2: {
    height: "100%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(25)} ${theme.typography.pxToRem(
      10
    )} ${theme.typography.pxToRem(30)} ${theme.typography.pxToRem(20)}`,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <InstructionsCard />
      <InitiateWizardCard />
    </Grid>
  );
}
