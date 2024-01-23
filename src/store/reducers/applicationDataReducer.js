const initialState = {
  callState: "incoming",
  customerId: null,
  contactId: null,
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
    default:
      return state;
  }
}
