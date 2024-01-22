import { Grid, Typography } from "@material-ui/core";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsgRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(20)}`,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    opacity: 0.8,
    color: "aliceblue",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
  },
  margin: {
    marginLeft: theme.typography.pxToRem(10),
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.headerRoot}>
      <PermPhoneMsgIcon />
      <Typography variant="h3" className={classes.margin}>
        AVA - AI Collections
      </Typography>
    </Grid>
  );
}
