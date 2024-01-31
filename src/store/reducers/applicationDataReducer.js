const initialState = {
  onPage2: false,
  callState: "incoming",
  isSimulationStarted: false,
  customer: null,
  contact: null,
  scenario: null,
  isWebSocketConnected: false,
  isAIResponseInProgress: false,
  callSummary: "",
  isAISpeaking: true,
};

export default function applicationDataReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CALL_TYPE":
      return {
        ...state,
        callState: action.payload,
      };
    case "SET_CUSTOMER_ID":
      return {
        ...state,
        customer: action.payload,
      };
    case "SET_CONTACT_ID":
      return {
        ...state,
        contact: action.payload,
      };
    case "SET_WEBSOCKET_CONNECTION":
      return {
        ...state,
        isWebSocketConnected: action.payload,
      };
    case "SET_SIMULATION_STARTED":
      return {
        ...state,
        isSimulationStarted: action.payload,
      };
    case "SET_PAGE2_STATE":
      return {
        ...state,
        onPage2: action.payload,
      };
    case "SET_AI_RESPONDING":
      return {
        ...state,
        isAIResponseInProgress: action.payload,
      };
    case "SET_AI_SPEAKING":
      return {
        ...state,
        isAISpeaking: action.payload,
      };
    case "SET_SCENARIO":
      return {
        ...state,
        scenario: action.payload,
      };
    case "RESET_REDUCERS":
      return {
        ...initialState,
        isWebSocketConnected: state.isWebSocketConnected,
      };
    default:
      return state;
  }
}
