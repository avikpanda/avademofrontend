import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { SPEECH_KEY, SPEECH_REGION } from "../utils/constants";

export default function SpeechToTextComponent({
  client,
  isWebSocketConnected,
}) {
  const dispatch = useDispatch();

  const transcriptData = useSelector(
    (state) => state.transcriptionReducer.data
  );

  const [recognizingTranscript, setRecTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const recognizer = useRef(null);

  const setMyTranscript = (transcriptPhrase) => {
    dispatch({
      type: "SET_CUSTOMER_RECOGNIZED_TRANSCRIPT",
      payload: transcriptPhrase,
    });
  };

  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      SPEECH_KEY,
      SPEECH_REGION
    );
    speechConfig.current.speechRecognitionLanguage = "en-US";

    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new sdk.SpeechRecognizer(
      speechConfig.current,
      audioConfig.current
    );

    const processRecognizedTranscript = (event) => {
      const result = event.result;
      console.log("Recognition result:", result);

      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        const transcript = result.text;
        console.log("Transcript: -->", transcript);
        // Call a function to process the transcript as needed

        setMyTranscript(transcript);
        console.log("isWebSocketConnected", isWebSocketConnected, transcript);
        if (isWebSocketConnected)
          client.sendMessage(
            "/app/user-all",
            JSON.stringify({
              message: transcript,
            })
          );
      }
    };

    const processRecognizingTranscript = (event) => {
      const result = event.result;
      console.log("Recognition result:", result);
      if (result.reason === sdk.ResultReason.RecognizingSpeech) {
        const transcript = result.text;
        console.log("Transcript: -->", transcript);
        // Call a function to process the transcript as needed

        setRecTranscript(transcript);
      }
    };

    recognizer.current.recognized = (s, e) => processRecognizedTranscript(e);
    recognizer.current.recognizing = (s, e) => processRecognizingTranscript(e);

    recognizer.current.startContinuousRecognitionAsync(() => {
      console.log("Speech recognition started.");
      setIsListening(true);
    });

    return () => {
      recognizer.current.stopContinuousRecognitionAsync(() => {
        setIsListening(false);
      });
    };
  }, []);

  const pauseListening = () => {
    setIsListening(false);
    recognizer.current.stopContinuousRecognitionAsync();
    console.log("Paused listening.");
  };

  const resumeListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognizer.current.startContinuousRecognitionAsync(() => {
        console.log("Resumed listening...");
      });
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognizer.current.stopContinuousRecognitionAsync(() => {
      console.log("Speech recognition stopped.");
    });
  };

  return (
    <div>
      {/* <button onClick={pauseListening}>Pause Listening</button>
      <button onClick={resumeListening}>Resume Listening</button>
      <button onClick={stopListening}>Stop Listening</button> */}

      {/* <div>
        <div>Recognizing Transcript : {recognizingTranscript}</div>

        <div>Full Transcript :</div>
        <ul>
          {transcriptData?.map((item, index) => (
            <li key={`customer_${index}`}>{item.text}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
