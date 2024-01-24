import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import SockJsClient from "react-stomp";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Call from "./views/Call";
import Home from "./views/Home";

function App() {
  const SockClient = React.useRef(null);
  const dispatch = useDispatch();
  const callState = useSelector(
    (state) => state.applicationDataReducer.callState
  );
  const onPage2 = useSelector((state) => state.applicationDataReducer.onPage2);
  const isSimulationStarted = useSelector(
    (state) => state.applicationDataReducer.isSimulationStarted
  );
  const isWebSocketConnected = useSelector(
    (state) => state.applicationDataReducer.isWebSocketConnected
  );
  const customerId = useSelector(
    (state) => state.applicationDataReducer.customer?.customerId
  );
  const scenarioId = useSelector(
    (state) => state.applicationDataReducer.scenario
  );

  const setWebSocketConnectionStatus = (flag) => {
    dispatch({
      type: "SET_WEBSOCKET_CONNECTION",
      payload: flag,
    });
  };

  useEffect(() => {
    if (isWebSocketConnected && !isSimulationStarted) {
      SockClient.current.sendMessage("/clear-chat-context");
    }
    if (isSimulationStarted) {
      const currentAnswer =
        callState === "incoming"
          ? "Hi, This is Ava from Highradius. How can I help you today?"
          : "Hey there, I am Ava from HighRadius. Is this the right time to talk?";
      dispatch({
        type: "SET_AI_RECOGNIZING_TRANSCRIPT",
        payload: currentAnswer,
      });
      if (isWebSocketConnected) {
        let initialContext = "";
        if (callState === "incoming") {
          initialContext = `IN-${customerId}`;
        } else {
          initialContext = `OUT${scenarioId}`;
        }

        SockClient.current.sendMessage(
          "/push-system-context",
          JSON.stringify({
            initialContext,
          })
        );
        SockClient.current.sendMessage(
          "/push-chat-history",
          JSON.stringify({
            currentAnswer,
          })
        );
      }
    }
  }, [isSimulationStarted]);

  const handleAIFunctionCall = (functionType) => {
    const invoiceCopyAnswer = "Sure! Sending you the invoice copy right away.";
    const accountStatementAnswer =
      "Alright! I will sent you the account statement. Is there anything else I can help you with?";
    const paymentLinkAnswer =
      "I have sent you the payment link over the email. You can click on the link and make your payment.";
    const p2pAnswer = "Sure I will create a P2P for you.";
    let currentAnswer;
    let emailType;
    switch (functionType) {
      case "INVOICE_COPY":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Customer Asked for Invoice Copy",
        });
        currentAnswer = invoiceCopyAnswer;
        emailType = "INVOICE_COPY";
        break;
      case "ACCOUNT_STATEMENT":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Customer requires Account Statement",
        });
        currentAnswer = accountStatementAnswer;
        emailType = "ACCOUNT_STATEMENT";
        break;
      case "PAYMENT_LINK":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Need to Send Payment Link",
        });
        currentAnswer = paymentLinkAnswer;
        emailType = "INVOICE_COPY";
        break;
      case "PAYMENT_COMMITTMENT":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Customer wants a P2P to be created",
        });
        currentAnswer = p2pAnswer;
        break;
      case "CALL_TRANSFER":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Transferring the call to a Specialist",
        });
        currentAnswer =
          "Sorry! I am not authorized to perform this action. I will transfer this call to a specialist to help you resolve your concern.";
        break;
      case "CALL_END":
        currentAnswer = "Have a great day!";
        setTimeout(() => {
          dispatch({
            type: "SET_SIMULATION_STARTED",
            payload: false,
          });
        }, 2000);
        break;
      default:
        break;
    }
    if (emailType) {
      dispatch({
        type: "SEND_EMAIL",
        payload: emailType,
      });
    }
    if (currentAnswer) {
      dispatch({
        type: "SET_AI_RECOGNIZING_TRANSCRIPT",
        payload: currentAnswer,
      });
    }
    if (isWebSocketConnected) {
      SockClient.current.sendMessage(
        "/push-chat-history",
        JSON.stringify({
          currentAnswer,
        })
      );
    }
  };

  // handleAIFunctionCall("INVOICE_COPY");
  // handleAIFunctionCall("ACCOUNT_STATEMENT");
  // handleAIFunctionCall("PAYMENT_LINK");
  // handleAIFunctionCall("PAYMENT_COMMITTMENT");
  // handleAIFunctionCall("CALL_TRANSFER");

  const handleAIMessage = (msg) => {
    switch (msg.responseType) {
      case "CHAT_RESPONSE":
        if (!isSimulationStarted) {
          dispatch({
            type: "SEND_EMAIL",
            payload: "CALL_SUMMARY",
            callSummary: msg.response,
          });
        }
        dispatch({
          type: "SET_AI_RECOGNIZING_TRANSCRIPT",
          payload: msg.response,
        });
        break;
      case "FUNCTION_CALL":
        handleAIFunctionCall(msg.response);
        break;
      default:
        dispatch({
          type: "SET_AI_RECOGNIZING_TRANSCRIPT",
          payload: "Sorry. Could you please repeat?",
        });
    }
    dispatch({
      type: "SET_AI_RESPONDING",
      payload: false,
    });
  };

  return (
    <>
      <SockJsClient
        url="http://localhost:8080/ava-events"
        topics={["/messages"]}
        onConnect={() => {
          console.log("connected");
          setWebSocketConnectionStatus(true);
        }}
        onDisconnect={() => {
          console.log("Disconnected");
          setWebSocketConnectionStatus(false);
        }}
        onMessage={(msg) => {
          console.log(msg);
          handleAIMessage(msg);
        }}
        ref={(client) => {
          console.log(client);
          SockClient.current = client;
        }}
        debug
      />
      <Header />
      {onPage2 ? (
        <Call
          client={SockClient.current}
          isWebSocketConnected={isWebSocketConnected}
        />
      ) : (
        <Home />
      )}
      <Footer />
      <Snackbar
        open={!isWebSocketConnected}
        onClose={() => {}}
        message="Connection Lost... ❌"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}

export default App;
