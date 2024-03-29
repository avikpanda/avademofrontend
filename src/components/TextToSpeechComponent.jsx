import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { SPEECH_KEY, SPEECH_REGION } from "../utils/constants";
import { useEffect } from "react";

export default function TextToSpeechComponent() {
  const dispatch = useDispatch();

  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const synthesizer = useRef(null);

  const [player, updatePlayer] = useState({ p: undefined, muted: false });

  const aiRecognizingTranscript = useSelector(
    (state) => state.transcriptionReducer.aiRecognizingTranscript
  );

  useEffect(() => {
    speechConfig.current = speechsdk.SpeechConfig.fromSubscription(
      SPEECH_KEY,
      SPEECH_REGION
    );
    const myPlayer = new speechsdk.SpeakerAudioDestination();
    updatePlayer((p) => {
      p.p = myPlayer;
      return p;
    });
    audioConfig.current = speechsdk.AudioConfig.fromSpeakerOutput(player.p);

    synthesizer.current = new speechsdk.SpeechSynthesizer(
      speechConfig.current,
      audioConfig.current
    );

    return () => {
      synthesizer.current.close();
      synthesizer.current = undefined;
    };
  }, []);

  useEffect(() => {
    textToSpeech(aiRecognizingTranscript);
  }, [aiRecognizingTranscript]);

  const setAITranscript = (transcriptPhrase) => {
    dispatch({
      type: "SET_AI_RECOGNIZED_TRANSCRIPT",
      payload: transcriptPhrase,
    });
  };

  async function textToSpeech(textToSpeak) {
    synthesizer.current.speakTextAsync(
      textToSpeak,
      (result) => {
        let text;
        if (
          result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted
        ) {
          text = `synthesis finished for "${textToSpeak}".\n`;
          dispatch({
            type: "SET_AI_SPEAKING",
            payload: true,
          });
          console.log(
            "AI Started Speaking. Duration: ",
            result.privAudioDuration
          );
          setTimeout(() => {
            dispatch({
              type: "SET_AI_SPEAKING",
              payload: false,
            });
            console.log("AI Finished Speaking");
          }, result.privAudioDuration / 10000);
        } else if (result.reason === speechsdk.ResultReason.Canceled) {
          text = `synthesis failed. Error detail: ${result.errorDetails}.\n`;
          console.error(text);
        }
        console.log("Avik Test", result);
        setAITranscript(textToSpeak);
        // setTimeout(() => {
        // }, 500);
      },
      function (err) {
        setAITranscript(`Error: ${err}.\n`);
      }
    );
  }

  //   async function handleMute() {
  //     updatePlayer((p) => {
  //       if (!p.muted) {
  //         p.p.pause();
  //         return { p: p.p, muted: true };
  //       } else {
  //         p.p.resume();
  //         return { p: p.p, muted: false };
  //       }
  //     });
  //   }

  return (
    <div>
      {/* <button
        onClick={() => {
          dispatch({
            type: "SET_AI_RECOGNIZING_TRANSCRIPT",
            payload:
              "This is an example of speech synthesis for a long passage of text. Pressing the mute button should pause/resume the audio output.",
          });
        }}
      >
        Click to speak
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_AI_RECOGNIZING_TRANSCRIPT",
            payload: "This is Avik.",
          });
        }}
      >
        Click to speak
      </button> */}
    </div>
  );
}
