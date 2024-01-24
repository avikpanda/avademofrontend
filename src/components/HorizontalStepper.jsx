import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import StorageRoundedIcon from "@material-ui/icons/StorageRounded";
import DialerSipRoundedIcon from "@material-ui/icons/DialerSipRounded";
import StepConnector from "@material-ui/core/StepConnector";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    animation: "$active 2s",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
  "@keyframes active": {
    "0%": {
      boxShadow: `0 0 0 0 rgba(252, 117, 0)`,
    },
    "50%": {
      boxShadow: `0 0 0 1rem rgba(252, 117, 0, 0.2)`,
    },
    "100%": {
      boxShadow: "0 0 0 0 rgba(252, 117, 0, 0.01)",
    },
  },
});

function ColorlibStepIcon({ active, completed, icon }) {
  const classes = useColorlibStepIconStyles();

  const icons = {
    1: <SearchRoundedIcon />,
    2: <StorageRoundedIcon />,
    3: <DialerSipRoundedIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps(isIncoming) {
  if (isIncoming)
    return [
      "Identifying the Contact",
      "Searching for the Customer & setting up Context",
      "Taking up the Call",
    ];
  return [
    "Finding a Suitable Customer",
    "Fetching the Context for the Customer",
    "Placing the Call",
  ];
}

export default function HorizontalStepper() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(null);

  const callState = useSelector(
    (state) => state.applicationDataReducer.callState
  );
  const isSimulationStarted = useSelector(
    (state) => state.applicationDataReducer.isSimulationStarted
  );
  const steps = getSteps(callState === "incoming");

  const initiateCall = () => {
    dispatch({
      type: "SET_PAGE2_STATE",
      payload: true,
    });
  };

  useEffect(() => {
    let intervalId;
    if (isSimulationStarted) {
      intervalId = setInterval(() => {
        setActiveStep((prevStep) => {
          if (prevStep === 2) initiateCall();
          if (prevStep === null) return 0;
          return prevStep + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isSimulationStarted]);

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
