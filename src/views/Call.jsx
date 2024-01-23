/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// import SpeechToTextComponent from "../components/SpeechToTextComponent";
import TextToSpeechComponent from "../components/TextToSpeechComponent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Chatbox from "../components/Chatbox";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "98vw",
    padding: `${theme.typography.pxToRem(60)} ${theme.typography.pxToRem(20)}`,
    paddingBottom: 0,
  },
  cardRoot: {
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    paddingBottom: 0,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: `${theme.typography.pxToRem(20)} !important`,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
  },
  custInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid grey",
    padding: theme.typography.pxToRem(20),
  },
  avatar: {
    backgroundColor: "grey",
    color: "#00000F",
    border: "2px solid grey",
  },
  hangup: {
    backgroundColor: "red",
    width: theme.typography.pxToRem(100),
    height: theme.typography.pxToRem(40),
    margin: 0,
    "&:hover": {
      backgroundColor: "red",
      border: "1px solid black",
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  stepperRoot: {
    padding: 0,
  },
  chatContainer: {
    display: "block",
    overflow: "scroll",
    height: theme.typography.pxToRem(250),
    width: "85%",
  },
}));

export default function Call({ client, isWebSocketConnected }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    "Correspondence Loading",
    "Correspondence Ready to send",
    "Correspondence Sent",
  ];
  const transcriptData = [
    { type: "customer", text: "Hi there" },
    { type: "AI", text: "Hello" },
  ];
  // const transcriptData = useSelector(
  //     (state) => state.transcriptionReducer.data
  // );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container alignItems="center" spacing={2} className={classes.root}>
      <Grid item xs={4}>
        <Card className={classes.cardRoot}>
          <CardHeader
            title="Contact Info"
            classes={{
              root: classes.cardHeader,
            }}
          />
          <CardContent
            classes={{
              root: classes.cardContent,
            }}
          >
            <div className={classes.custInfoContainer}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                A
              </Avatar>
              <Typography className={classes.title} color="textSecondary">
                Contact Name : Abhijeet Dey
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Contact Number : +91 000-000-0000
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Security Role : Analyst
              </Typography>
              <Button
                className={classes.hangup}
                onClick={() => {
                  if (isWebSocketConnected && client)
                    client.sendMessage(
                      "/process-speech",
                      JSON.stringify({
                        name: "Abhijeet Dey",
                        message: "this.state.typedMessage",
                      })
                    );
                }}
              >
                Hangup
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.cardRoot}>
          <CardHeader title="Account Context" />
          <CardContent
            classes={{
              root: classes.cardContent,
            }}
          ></CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.cardRoot}>
          <CardHeader title="AI Touch Points" />
          <CardContent
            classes={{
              root: classes.cardContent,
            }}
          >
            <Stepper
              activeStep={activeStep}
              classes={{ root: classes.stepperRoot }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.cardRoot}>
          <CardHeader title="Transcription" />
          <CardContent
            classes={{
              root: classes.cardContent,
            }}
          >
            <div className={classes.chatContainer}>
              {transcriptData?.map(
                (transcript) =>
                  transcript?.text?.trim().length > 0 && (
                    <Chatbox
                      side={transcript.type == "customer" ? "left" : "right"}
                      avatarTitle={transcript.type}
                      timestamp={new Date()}
                      key={transcript?.text}
                      avatarChildren={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {transcript?.type == "AI" ? transcript?.type : transcript?.type?.substring(0, 1)}
                        </Avatar>
                      }
                      text={transcript?.text}
                    />
                  )
              )}
            </div>
            {/* <SpeechToTextComponent /> */}
            <TextToSpeechComponent />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
