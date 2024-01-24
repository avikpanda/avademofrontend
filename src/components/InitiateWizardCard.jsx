import clsx from "clsx";
import {
  Grid,
  Card,
  Typography,
  Button,
  MenuItem,
  Select,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import customerData from "../assets/data/customerData";
import HorizontalStepper from "./HorizontalStepper";

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
      20
    )} ${theme.typography.pxToRem(30)} ${theme.typography.pxToRem(10)}`,
  },
  callTypeSwitch: {
    backgroundColor: "gray",
    borderRadius: theme.typography.pxToRem(10),
  },
  callTypeSwitchRoot: {
    "&:hover": {
      backgroundColor: "gray",
    },
  },
  defaultSwtch: {
    padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(15)}`,
    borderRadius: theme.typography.pxToRem(5),
    backgroundColor: "gray",
    opacity: 0.33,
  },
  highlighted: {
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
  },
  border: {
    borderRadius: theme.typography.pxToRem(5),
    border: "1px solid #FAFAFA",
  },
  robogif: {
    height: theme.typography.pxToRem(150),
    width: theme.typography.pxToRem(150),
  },
  selectCustomer: {
    width: theme.typography.pxToRem(350),
  },
  submitButton: {
    width: theme.typography.pxToRem(170),
    height: theme.typography.pxToRem(170),
    borderRadius: "50%",
    border: "4px solid rgba(97, 111, 128, 1)",
  },
  hide: {
    opacity: 0,
  },
}));

const scenarios = [
  {
    id: 1,
    name: "OverDue and Payment Reminders",
  },
  {
    id: 2,
    name: "Broken Payment Commitment Reminder",
  },
  {
    id: 3,
    name: "Upcoming P2P Reminder",
  },
];

export default function InitiateWizardCard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const callState = useSelector(
    (state) => state.applicationDataReducer.callState
  );
  const customerId = useSelector(
    (state) => state.applicationDataReducer.customerId
  );

  const setIsIncomingFlow = (selectedCallType) => {
    dispatch({
      type: "SET_CALL_TYPE",
      payload: selectedCallType,
    });
  };

  const setCustomerId = (customerId) => {
    dispatch({
      type: "SET_CUSTOMER_ID",
      payload: customerId,
    });
  };

  const setContactId = (contactId) => {
    dispatch({
      type: "SET_CONTACT_ID",
      payload: contactId,
    });
  };

  const setIsCallInitiated = (flag) => {
    dispatch({
      type: "SET_PAGE2_STATE",
      payload: flag,
    });
  };

  const setScenario = (id) => {
    dispatch({
      type: "SET_SCENARIO",
      payload: id,
    });
  };

  const startSimulation = () => {
    dispatch({
      type: "SET_SIMULATION_STARTED",
      payload: true,
    });
  };

  return (
    <Grid item xs={6} className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">Start Simulation Engine</Typography>
        <br />
        <Grid item xs={12} container justifyContent="center">
          <img
            src="./src/assets/images/aiRobo.gif"
            className={classes.robogif}
          />
        </Grid>
        <Typography variant="body1">Select a Call Type:</Typography>
        <br />
        <Button
          className={classes.callTypeSwitch}
          classes={{ root: classes.callTypeSwitchRoot }}
          disableRipple
        >
          <Grid container className={classes.border}>
            <Grid
              item
              className={clsx({
                [classes.highlighted]: callState === "incoming",
                [classes.defaultSwtch]: true,
              })}
              onClick={() => {
                setIsIncomingFlow("incoming");
              }}
            >
              Incoming
            </Grid>
            <Grid
              item
              className={clsx({
                [classes.highlighted]: callState === "outgoing",
                [classes.defaultSwtch]: true,
              })}
              onClick={() => {
                setIsIncomingFlow("outgoing");
              }}
            >
              Outgoing
            </Grid>
          </Grid>
        </Button>
        <br />
        <br />
        <Typography variant="body1">
          {callState === "incoming" ? "Pick a Customer:" : "Pick a Scenario:"}
        </Typography>
        <br />
        {callState === "incoming" ? (
          <Select
            variant="outlined"
            className={classes.selectCustomer}
            onChange={(event) => {
              setCustomerId(event.target.value);
            }}
          >
            <MenuItem value={{}}>
              <em>None</em>
            </MenuItem>
            {customerData.map((item) => (
              <MenuItem key={item.customerId} value={item}>
                {item.customerName}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            variant="outlined"
            className={classes.selectCustomer}
            onChange={(event) => {
              setScenario(event.target.value);
            }}
          >
            <MenuItem value={{}}>
              <em>None</em>
            </MenuItem>
            {scenarios.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        )}
        <br />
        <HorizontalStepper />
        <br />
        <br />
        <Grid item xs={12} container justifyContent="center">
          <IconButton
            className={classes.submitButton}
            onClick={startSimulation}
          >
            Start Simulation
          </IconButton>
        </Grid>
      </Card>
    </Grid>
  );
}
