const initialState = {
  onPage2: false,
  isOnCall: false,
  callState: "incoming",
  customerId: null,
  contactId: null,
  isWebSocketConnected: false,
  data: [],
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
        customerId: action.payload,
      };
    case "SET_CONTACT_ID":
      return {
        ...state,
        contactId: action.payload,
      };
    case "SET_WEBSOCKET_CONNECTION":
      return {
        ...state,
        isWebSocketConnected: action.payload,
      };
    case "SET_PAGE2_STATE":
      return {
        ...state,
        onPage2: action.payload,
      };
    case "RESET_REDUCERS":
      return initialState;
    default:
      return state;
  }
}
