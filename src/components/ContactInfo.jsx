import { Grid, Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
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

export default function ContactInfo() {
  const classes = useStyles();
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
          <Typography>00:00</Typography>
          <Button className={classes.hangup}>Hangup Call</Button>
        </Grid>
        <div className={classes.custInfoContainer}>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Name :</div>
            Abhijeet Dey
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            <div className={classes.label}>Mobile :</div>
            +91 000-000-0000
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
