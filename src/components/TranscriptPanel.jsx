/* eslint-disable react/prop-types */
import { Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import SpeechToTextComponent from "./SpeechToTextComponent";
import TextToSpeechComponent from "./TextToSpeechComponent";
import Chatbox from "./Chatbox";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
    height: `calc(100% - ${theme.typography.pxToRem(60)})`,
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
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

  const updateScroll = () => {
    const element = document.getElementById("scroll");
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    updateScroll();
  }, [transcriptData]);

  useEffect(() => {
    if (!isSimulationStarted && isWebSocketConnected) {
      dispatch({
        type: "ADD_AI_TOUCHPOINT",
        payload: "Sending Call Summary",
      });
    }
  }, [isSimulationStarted]);

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
      </Card>
    </Grid>
  );
}
