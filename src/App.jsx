import SockJsClient from "react-stomp";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Call from "./views/Call";

function App() {
  const SockClient = React.useRef(null);
  const dispatch = useDispatch();
  const onPage2 = useSelector((state) => state.applicationDataReducer.onPage2);
  const isSimulationStarted = useSelector(
    (state) => state.applicationDataReducer.isSimulationStarted
  );
  const isWebSocketConnected = useSelector(
    (state) => state.applicationDataReducer.isWebSocketConnected
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
        "Hi! This is Ava from Highradius. How can I help you today?";
      dispatch({
        type: "SET_AI_RECOGNIZING_TRANSCRIPT",
        payload: currentAnswer,
      });
      if (isWebSocketConnected) {
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
      "Done! I have sent you the account statement. You can go ahead and verify.";
    const paymentLinkAnswer =
      "I have sent you the payment link over the email. You can click on the link and make your payment.";
    const p2pAnswer = "Sure I will create a P2P for you.";
    let currentAnswer;
    switch (functionType) {
      case "INVOICE_COPY":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Customer Asked for Invoice Copy",
        });
        currentAnswer = invoiceCopyAnswer;
        break;
      case "ACCOUNT_STATEMENT":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Customer requires Account Statement",
        });
        currentAnswer = accountStatementAnswer;
        break;
      case "PAYMENT_LINK":
        dispatch({
          type: "ADD_AI_TOUCHPOINT",
          payload: "Need to Send Payment Link",
        });
        currentAnswer = paymentLinkAnswer;
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
          payload: functionType,
        });
        currentAnswer =
          "Sorry! I am not authorized to perform this action. I will transfer this call to a specialist to help you resolve your concern.";
        break;
      default:
        break;
    }
    dispatch({
      type: "SET_AI_RECOGNIZING_TRANSCRIPT",
      payload: currentAnswer,
    });
    if (isWebSocketConnected) {
      SockClient.current.sendMessage(
        "/push-chat-history",
        JSON.stringify({
          currentAnswer,
        })
      );
    }
  };

  const handleAIMessage = (msg) => {
    switch (msg.responseType) {
      case "CHAT_RESPONSE":
        dispatch({
          type: "SET_AI_RECOGNIZING_TRANSCRIPT",
          payload: msg.response,
        });
        break;
      case "FUNCTION_CALL":
        handleAIFunctionCall(msg.response);
        return;
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
    </>
  );
}

export default App;
