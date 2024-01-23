import { ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import theme from "./theme";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
