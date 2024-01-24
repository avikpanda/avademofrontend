import React, { useEffect } from "react";
import {
  Grid,
  Card,
  Stepper,
  StepLabel,
  StepContent,
  Step,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import AIStepperComponent from "./AIStepperComponent";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(20)}`,
  },
  root: {
    height: "66.66%",
    boxSizing: "border-box",
    padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(
      20
    )} ${theme.typography.pxToRem(30)} ${theme.typography.pxToRem(20)}`,
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
  stepperContainer: {
    height: `calc(100% - ${theme.typography.pxToRem(60)})`,
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

export default function AITouchpoints() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [isManualOpen, setIsManualOpen] = React.useState(false);

  const steps = useSelector((state) => state.aiTouchpointsReducer?.data);

  useEffect(() => {
    setIsManualOpen(false);
    setActiveStep(steps?.length - 1);
    setTimeout(() => {
      setActiveStep(steps?.length);
    }, 3000);
  }, [steps]);

  const updateScroll = () => {
    const element = document.getElementById("stepperScroll");
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    updateScroll();
  }, [steps]);

  return (
    <Grid item xs={12} className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">AI Touch Points</Typography>
        <br />
        <div id="stepperScroll" className={classes.stepperContainer}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            classes={{ root: classes.stepperRoot }}
          >
            {steps?.map((label, key) => (
              <Step
                key={label}
                onClick={() => {
                  setActiveStep(key);
                  setIsManualOpen(true);
                }}
              >
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div className={classes.actionsContainer}>
                    <AIStepperComponent
                      type={label}
                      isManualOpen={isManualOpen}
                    />
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </Card>
    </Grid>
  );
}
