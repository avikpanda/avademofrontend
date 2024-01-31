import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

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
      20
    )} ${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(10)}`,
  },
  custInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "aliceblue",
    marginBottom: theme.typography.pxToRem(20),
  },
  hangup: {
    backgroundColor: theme.palette.primary.main,
    padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(30)}`,
    marginTop: theme.typography.pxToRem(30),
  },
  title: {
    marginTop: theme.typography.pxToRem(4),
    display: "flex",
    width: "100%",
  },
  label: {
    minWidth: "33.33%",
  },
}));

export default function AccountInfo() {
  const classes = useStyles();

  const customerData = useSelector(
    (state) => state.applicationDataReducer.customer
  );

  return (
    <Grid item xs={6} className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">Account Context</Typography>
        <br />
        <div className={classes.custInfoContainer}>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Customer Name :</div>
            {customerData?.customerName}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Customer Number :</div>
            {customerData?.customerNumber}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Open Invoices :</div>
            {customerData?.openInvoices}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Last Communication Summary :</div>
            {customerData?.lastCallSummary}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Customer Status :</div>
            {customerData?.status}
          </Typography>
        </div>
      </Card>
    </Grid>
  );
}
