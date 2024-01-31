/* eslint-disable react/prop-types */
import { Grid, Card, Button } from "@material-ui/core";
import { Mic, MicOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import SpeechToTextComponent from "./SpeechToTextComponent";
import TextToSpeechComponent from "./TextToSpeechComponent";
import Chatbox from "./Chatbox";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";

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
    )} ${theme.typography.pxToRem(30)} 0`,
  },
  chatContainer: {
    height: `calc(100% - ${theme.typography.pxToRem(100)})`,
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.typography.pxToRem(5),
  },
  micButton: {
    backgroundColor: "#8FD163",
    width: theme.typography.pxToRem(35),
    height: theme.typography.pxToRem(35),
    borderRadius: "50%",
    pointerEvents: "none",
  },
  muteButton: {
    backgroundColor: theme.palette.text.disabled,
    pointerEvents: "none",
  },
}));

export default function TranscriptPanel({ client, isWebSocketConnected }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transcriptData = useSelector(
    (state) => state.transcriptionReducer.data
  );

  const preTranscriptData = useSelector(
    (state) => state.transcriptionReducer.customerRecognizingTranscript
  );

  const isSimulationStarted = useSelector(
    (state) => state.applicationDataReducer.isSimulationStarted
  );

  const isAIResponseInProgress = useSelector(
    (state) => state.applicationDataReducer.isAIResponseInProgress
  );

  const isAISpeaking = useSelector(
    (state) => state.applicationDataReducer.isAISpeaking
  );

  const updateScroll = () => {
    const element = document.getElementById("scroll");
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    updateScroll();
  }, [transcriptData, preTranscriptData, isAIResponseInProgress]);

  useEffect(() => {
    if (!isSimulationStarted && isWebSocketConnected) {
      dispatch({
        type: "ADD_AI_TOUCHPOINT",
        payload: "Sending Call Summary",
      });
    }
  }, [isSimulationStarted]);

  const Spinner = () => (
    <div className="spinner">
      <div className="spinner__item1"></div>
      <div className="spinner__item2"></div>
      <div className="spinner__item3"></div>
      <div className="spinner__item4"></div>
    </div>
  );

  return (
    <Grid item xs={12} className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">Call Transcript</Typography>
        <br />
        <div id="scroll" className={classes.chatContainer}>
          <>
            {transcriptData?.map(
              (transcript) =>
                transcript?.text?.trim().length > 0 && (
                  <Chatbox
                    side={transcript.type == "customer" ? "left" : "right"}
                    avatarTitle={transcript.type == "ai" ? "AI" : "C"}
                    name={transcript.type == "ai" ? "AVA" : "Customer"}
                    timestamp={new Date()}
                    key={transcript?.text}
                    text={transcript?.text}
                  />
                )
            )}
            {preTranscriptData?.trim()?.length > 0 && (
              <Chatbox
                side={"left"}
                avatarTitle={"C"}
                name={"Customer"}
                timestamp={new Date()}
                key={0}
                text={preTranscriptData}
              />
            )}
            {isAIResponseInProgress && isSimulationStarted && (
              <Chatbox
                side={"right"}
                avatarTitle={"AI"}
                name={"AVA"}
                timestamp={new Date()}
                key={0}
              >
                <Spinner />
              </Chatbox>
            )}
          </>
        </div>
        {isSimulationStarted && (
          <>
            <SpeechToTextComponent
              isWebSocketConnected={isWebSocketConnected}
              client={client}
            />
            <TextToSpeechComponent />
          </>
        )}
        <div className={classes.buttonContainer}>
          <Button
            classes={{
              text: clsx(classes.micButton, {
                [classes.muteButton]:
                  !isSimulationStarted ||
                  (isSimulationStarted &&
                    (isAISpeaking || isAIResponseInProgress)),
              }),
            }}
          >
            {!isSimulationStarted ||
            (isSimulationStarted &&
              (isAISpeaking || isAIResponseInProgress)) ? (
              <MicOff />
            ) : (
              <Mic />
            )}
          </Button>
        </div>
      </Card>
    </Grid>
  );
}
