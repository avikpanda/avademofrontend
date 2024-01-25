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
  indent: {
    padding: `0 ${theme.typography.pxToRem(30)}`,
  },
}));

const outgoingScenarios = [
  {
    id: 1,
    type: "info",
    text: "Overdue and Payment Reminders",
  },
  {
    id: 2,
    type: "info",
    text: "Upcoming Payment Commitment Reminder",
  },
  {
    id: 3,
    type: "info",
    text: "Broken Payment Commitment",
  },
];

const incomingScenarios = [
  {
    id: 1,
    type: "info",
    text: "Give user clarity on the invoice data",
  },
  {
    id: 2,
    type: "info",
    text: "Help Making Payments: If the customer wants to make a payment, ava is capable of guiding them to use the payment portal or send the payment link.",
  },
  {
    id: 3,
    type: "info",
    text: "Create Payment Commitments and Follow Ups: Ava is capable of creating payment commitments and schedule follow ups.",
  },
  {
    id: 4,
    type: "info",
    text: "Received Account Statement or Invoice copies: Ava can, if requested send an email containing the statement of the account or copy of the invoice requested.",
  },
];

export default function InstructionsCard() {
  const classes = useStyles();
  return (
    <Grid item xs={6} className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">Instructions</Typography>
        <br />
        <Typography variant="subtitle2">
          This is a collection analyst in the O2C cycle for Highradius
          Technologies named Ava. She is capable of having professional
          conversations and small talks if needed. Her primary goal is to guide
          the customer so that they end up getting all their answers regarding
          their invoices, actions and basic account related questions.
        </Typography>
        <br />
        <Typography variant="subtitle2">What Ava can do?</Typography>
        <br />
        <div className={classes.indent}>
          <Typography variant="subtitle2">Outgoing Call Scenarios:</Typography>
          <ul>
            {outgoingScenarios.map((item) => (
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
          <br />
          <Typography variant="subtitle2">Incoming Call Scenarios:</Typography>
          <ul>
            {incomingScenarios.map((item) => (
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
        </div>
      </Card>
    </Grid>
  );
}
