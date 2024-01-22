import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhoneCallbackRoundedIcon from "@material-ui/icons/PhoneCallbackRounded";

const useStyles = makeStyles((theme) => ({
  ctaIcon: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: theme.typography.pxToRem(5),
    color: "white",
    padding: `${theme.typography.pxToRem(20)} ${theme.typography.pxToRem(50)}`,
    fontSize: theme.typography.pxToRem(50),
  },
  root: {
    height: "100vh",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <Button>
        <PhoneCallbackRoundedIcon className={classes.ctaIcon} />
      </Button>
    </Grid>
  );
}
