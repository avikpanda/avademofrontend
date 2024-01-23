import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InstructionsCard from "../components/InstructionsCard";
import InitiateWizardCard from "../components/InitiateWizardCard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.typography.pxToRem(51)})`,
    marginTop: theme.typography.pxToRem(51),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <InstructionsCard />
      <InitiateWizardCard />
    </Grid>
  );
}
