const initialState = {
  status: "",
};

export default function sendEmailReducer(state = initialState, action) {
  switch (action.type) {
    case "SEND_EMAIL":
      return { ...state, status: "In-Progress" };
    case "SEND_EMAIL_SUCCESS":
      return { ...state, status: "Success" };
    case "SEND_EMAIL_ERROR":
      return { ...state, status: "Error" };
    case "RESET_REDUCERS":
      return initialState;
    default:
      return state;
  }
}
