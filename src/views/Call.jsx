/* eslint-disable react/prop-types */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ContactInfo from "../components/ContactInfo";
import AccountInfo from "../components/AccountInfo";
import AITouchpoints from "../components/AITouchpoints";
import TranscriptPanel from "../components/TranscriptPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.typography.pxToRem(51)})`,
    marginTop: theme.typography.pxToRem(51),
  },
  wrapper: {
    height: "100%",
    overflow: "hidden",
  },
}));

export default function Call({ client, isWebSocketConnected }) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Grid container justifyContent="center" item xs={8} className={classes.wrapper}>
        <ContactInfo />
        <AccountInfo />
        <AITouchpoints />
      </Grid>
      <Grid
        container
        justifyContent="center"
        item
        xs={4}
        className={classes.wrapper}
      >
        <TranscriptPanel
          isWebSocketConnected={isWebSocketConnected}
          client={client}
        />
      </Grid>
    </Grid>
  );
}
