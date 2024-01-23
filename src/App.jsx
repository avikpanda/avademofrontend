import SockJsClient from "react-stomp";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Call from "./views/Call";

function App() {
  const SockClient = React.useRef(null);
  const dispatch = useDispatch();

  const isWebSocketConnected = useSelector(
    (state) => state.applicationDataReducer.isWebSocketConnected
  );

  const setWebSocketConnectionStatus = (flag) => {
    dispatch({
      type: "SET_WEBSOCKET_CONNECTION",
      payload: flag,
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
        }}
        ref={(client) => {
          console.log(client);
          SockClient.current = client;
        }}
        debug
      />
      <Header />
      {true ? <Call client={SockClient.current} isWebSocketConnected={isWebSocketConnected} /> : <Home />}
      {console.log(SockClient.current)}
      <Footer />
    </>
  );
}

export default App;
