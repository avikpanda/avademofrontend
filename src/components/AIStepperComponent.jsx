import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import StorageRoundedIcon from "@material-ui/icons/StorageRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
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
    3: <CheckCircleOutlineRoundedIcon />,
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

function getSteps(type) {
  switch (type) {
    case "Customer Asked for Invoice Copy":
      return [
        "Looking for Invoice Copy Template",
        "Sending the Email for Processing",
        "Invoice Copy Sent",
      ];
    case "Customer requires Account Statement":
      return [
        "Looking for Account Statement Template",
        "Sending the Email for Processing",
        "Account Statement Sent",
      ];
    case "Need to Send Payment Link":
      return [
        "Identifying the Required Template",
        "Sending the Email for Processing",
        "Payment link sent with Invoice Details.",
      ];
    case "Customer wants a P2P to be created":
      return [
        "Identifying the Invoice to create P2P",
        "Processing P2P",
        "P2P Created Successfully",
      ];
    case "Transferring the call to a Specialist":
      return [
        "Identifying the right person for this job",
        "Making a Transfer Request to Ayush Kumar",
        "Call was Transferred",
      ];
    default:
      return ["", "", ""];
  }
}

export default function AIStepperComponent({ type, isManualOpen }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(null);

  const steps = getSteps(type);

  useEffect(() => {
    let intervalId;
    if (!isManualOpen) {
      intervalId = setInterval(() => {
        setActiveStep((prevStep) => {
          if (prevStep === null) return 0;
          return prevStep + 1;
        });
      }, 1450);
    } else {
      setActiveStep(2);
    }
    return () => clearInterval(intervalId);
  }, [isManualOpen]);

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
